import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/router";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { FaCog, FaEye, FaTachometerAlt, FaVideo } from "react-icons/fa";
import { Dashboard } from "@mui/icons-material";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import Link from "next/link";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { Banner } from "@/components/banner";
import { ChapterActions } from "./_components/chapter-actions";

const ChapterIdPage = async ({
        params
}:{
        params : {
                courseId: string;
                chapterId: string
        }
}) => {
        const {userId} = auth();
        if(!userId) return redirect("/")

        const chapter = await db.chapter.findUnique({
                where:{
                        id: params.chapterId,
                        courseId: params.courseId
                },
                include:{
                        muxData: true
                }
        })
        if(!chapter){
                return redirect("/")
        }

        const requiredFields = [
                chapter.title,
                chapter.description,
                chapter.videoUrl
        ]

        const completedFields = requiredFields.filter(Boolean).length
        const totalFields = requiredFields.length
        const completionText = `(${completedFields}/${totalFields})`
        
        // const isComplete = completedFields === totalFields
        const isComplete = requiredFields.every(Boolean)



        return (
                <>
                  {!chapter.isPublished && (
                    <Banner
                      variant="warning"
                      label="The chapter is unpublished"
                    />
                  )}
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="w-full">
                        <Link
                          href={`/mentor/courses/${params.courseId}`}
                          className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to the course setup
                        </Link>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                              Create chapter
                            </h1>
                            <span className="text-sm text-slate-700">
                              Complete the necessary fields {completionText}
                            </span>
                          </div>
                          <ChapterActions
                            disabled={isComplete === null}  ////
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                            isPublished={chapter.isPublished}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-x-2">
                            <FaCog />
                            <h2 className="text-xl">
                              Customize the chapter
                            </h2>
                          </div>
                          <ChapterTitleForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                          />
                          <ChapterDescriptionForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-x-2">
                            {/* <FaEye /> */}
                            <h2 className="text-xl">
                              Access settings
                            </h2>
                          </div>
                          <ChapterAccessForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-x-2">
                          <FaVideo/>
                          <h2 className="text-xl">
                            Add video
                          </h2>
                        </div>
                        <ChapterVideoForm
                          initialData={chapter}
                          chapterId={params.chapterId}
                          courseId={params.courseId}
                        />
                      </div>
                    </div>
                  </div>
                </>
               );
            }
             
 export default ChapterIdPage;