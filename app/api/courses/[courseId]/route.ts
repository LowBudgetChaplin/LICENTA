import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const {video} = new Mux({
        tokenId: process.env['MUX_TOKEN_ID'], 
        tokenSecret: process.env['MUX_TOKEN_SECRET'],
});
      

export async function PATCH(
        req: Request,

        {params}:{params : { courseId: string}}
){
        try{
             const { userId} = auth();
             const {courseId} = params;
             const values = await req.json()



             if(userId === null){
                return new NextResponse("This action is unauthorized", {status:401})
             }   
             const course = await db.course.update({
                where:{
                        id: courseId,
                        userId: userId
                },
                data:{
                        ...values
                }
             })

             return NextResponse.json(course)
        }catch(err){
                console.log("COURSE_ID", err);
                return new NextResponse("Internal error", {status: 500})
        }
}


export async function DELETE(
        req: Request,
        { params }: { params: { courseId: string } }
      ) {
        try {
          const { userId } = auth();
      
          if (!userId) {
            return new NextResponse("This action is unauthorized", { status: 401 });
          }
      
          const course = await db.course.findUnique({
            where: {
              id: params.courseId,
              userId: userId,
            },
            include: {
              chapters: {
                include: {
                  muxData: true,
                }
              }
            }
          });
      
          if (!course) {
            return new NextResponse("Not found", { status: 404 });
          }
      
          for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
              await video.assets.delete(chapter.muxData.assetId);
            }
          }
      
          const deletedCourse = await db.course.delete({
            where: {
              id: params.courseId,
            },
          });
      
          return NextResponse.json(deletedCourse);
        } catch (err) {
          console.log("COURSE_ID_DELETE", err);
          return new NextResponse("Internal Error", { status: 500 });
        }
      }