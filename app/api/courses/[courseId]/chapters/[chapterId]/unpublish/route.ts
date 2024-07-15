import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
        req: Request,
        { params }: { params: { courseId: string; chapterId: string } }
) {
        try{
                const {userId} = auth();

                if(!userId){
                        return new NextResponse("This action is unauthorized", {status:401})
                }

                const ownCourse = await db.course.findUnique({
                        where:{
                                id: params.courseId,
                                userId
                        }
                })

                if(!ownCourse){
                        return new NextResponse("This action is unauthorized", {status:401})
                }





                const unpublishedChapter = await db.chapter.update({
                        where:{
                                id: params.chapterId,
                                courseId : params.courseId
                        },
                        data:{
                                isPublished: false
                        }
                })

                const publishedChapter = await db.chapter.findMany({
                        where:{
                                courseId: params.courseId,
                                isPublished: true
                        }
                })
                if(!publishedChapter.length){
                        await db.course.update({
                                where:{
                                        id: params.courseId
                                },
                                data:{
                                        isPublished: false
                                }
                        })
                }

                return NextResponse.json(unpublishedChapter)
        }catch(err){
                console.log("CHAPTER_UNPUBLISH", err);
                return new NextResponse("Internal error" , {status:500})              
        }
}