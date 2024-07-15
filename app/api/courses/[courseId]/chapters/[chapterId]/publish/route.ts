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

                const chapter = await db.chapter.findUnique({
                        where:{
                                id: params.chapterId,
                                courseId: params.courseId
                        }
                })

                if(!chapter){
                        return new NextResponse("Chapter not found", {status:404})
                }

                const mux = await db.muxData.findUnique({
                        where:{
                                chapterId: params.chapterId
                        }
                })

                if(!mux){
                        return new NextResponse("Chapter video not found", {status:404})
                }
                if(!chapter.title){
                        return new NextResponse("Missing title", {status:404})
                }
                if(!chapter.description){
                        return new NextResponse("Missing chapters", {status:404})
                }
                if(!chapter.videoUrl){
                        return new NextResponse("Chapter videos are missing", {status:404})
                }


                const publishedChapter = await db.chapter.update({
                        where:{
                                id: params.chapterId,
                                courseId : params.courseId
                        },
                        data:{
                                isPublished: true
                        }
                })

                return NextResponse.json(publishedChapter)
        }catch(err){
                console.log("CHAPTER_PUBLISH", err);
                return new NextResponse("Internal error" , {status:500})              
        }
}