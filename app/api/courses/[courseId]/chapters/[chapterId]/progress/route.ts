import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import { Request } from "express";



export async function PUT(
        req: Request,
        {params} : {
                        params:{
                                courseId:string
                                chapterId:string
                        }
                }
) {
        try{
                const { userId } = auth();
                const { isCompleted } = await req.json();
                if (!userId) {
                        return new NextResponse("This action is not authorized", { status: 401 });
                } 

                const userProgress = await db.userProgress.upsert({
                        where: {
                                userId_chapterId: {
                                        chapterId: params.chapterId,
                                        userId
                                }
                        },
                        create: {
                                chapterId: params.chapterId,
                                userId,
                                isCompleted
                        },
                        update: {
                                isCompleted
                        }
                });
                
                return NextResponse.json(userProgress);
        }catch(err){
                console.log("CHAPTER_ID_PROGRESS", err);
                return new NextResponse("Internal error", {status:500});
                
        }
        
}