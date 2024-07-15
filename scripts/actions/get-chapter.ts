import { db } from "@/lib/db";
// import { Course, Chapter, UserProgress } from "@/types";
import { Attachment } from "@prisma/client";
import { Chapter } from "@prisma/client";

interface GetChapterProps{
        userId: string;
        courseId: string;
        chapterId: string;
}


export const getChapter = async ({
        userId,
        courseId,
        chapterId
}: GetChapterProps) => {
        try{
                const purchase = await db.purchase.findUnique({
                        where:{
                                userId_courseId:{
                                        userId,
                                        courseId,
                                }
                        }
                })

                const course = await db.course.findUnique({
                        where:{
                                isPublished: true,
                                id: courseId
                        },
                       select:{
                        price: true
                       }
                })


                const chapter = await db.chapter.findUnique({
                        where:{
                                id: chapterId,
                                isPublished: true
                        },
                })

                if(!chapter){
                        throw new Error("Chapter not found");
                }
                if(!course){
                        throw new Error("Course not found");
                }

                var mux =  null;
                var attachments : Attachment[] = [];
                var nextChapter : Chapter | null = null;
                
                if(purchase){
                        attachments = await db.attachment.findMany({
                                where:{
                                        courseId : courseId
                                }
                        })
                }
                if(chapter.isFree || purchase){
                        mux = await db.muxData.findUnique({
                                where:{
                                        chapterId: chapterId
                                }
                        })
                        nextChapter = await db.chapter.findFirst({
                                where:{
                                        courseId: courseId,
                                        isPublished: true,
                                        position:{
                                                gt: chapter?.position
                                        }
                                },
                                orderBy:{
                                        position: "asc"
                                }
                        })
                }

                const userProgress = await db.userProgress.findUnique({
                        where:{
                                userId_chapterId:{
                                        userId,
                                        chapterId
                                }
                        }
                })




                
                return {
                        chapter,
                        course,
                        mux,
                        attachments,
                        nextChapter,
                        userProgress,
                        purchase
                }
        }catch(err){
                console.error("GET_CHAPTER",err);
                return {
                        chapter: null,
                        course: null,
                        mux: null,
                        attachments: null,
                        nextChapter: null,
                        userProgress: null,
                        purchase: null,
                }
        }
}