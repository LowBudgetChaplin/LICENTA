import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("This is an unauthorized action", { status: 401 });
    }

    const { list } = await req.json();

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    });

    if (!ownCourse) {
      return new NextResponse("This is an unauthorized action", { status: 401 });
    }

    for (var item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    console.log("REORDER", err);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}