import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(
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
        userId,
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
      return new NextResponse("Course not found", { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

        if(!course.title){
                return new NextResponse("Missing title", {status:404})
        }
        if(!course.description){
                return new NextResponse("Missing chapters", {status:404})
        }
        if(!course.imageUrl){
                        return new NextResponse("There is no image", {status:404})
        }
        if(!course.categoryId){
                        return new NextResponse("There is no category", {status:404})
        }
        if(!hasPublishedChapter){
                        return new NextResponse("There is no published chapter", {status:404})
        }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("COURSE_ID_PUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}