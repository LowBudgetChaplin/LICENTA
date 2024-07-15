import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CheckIcon, CircleDollarSign, File, Icon, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachMoney } from '@mui/icons-material';
import { IconBase, IconContext } from "react-icons/lib";
import { FaDollarSign } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { CourseActions } from "./_components/course-actions";




const CourseIdPage = async ({
        params
}:{
        params:{courseId: string}
}) => {
        const {userId} = auth();
        if(userId === null){
                return redirect("/");
        }

        const course = await db.course.findUnique({
                where: {
                  id: params.courseId,
                  userId
                },
                include: {
                  chapters: {
                    orderBy: {
                      position: "asc"
                    }
                  },
                  attachments: {
                    orderBy: {
                      createdAt: "desc"
                    }
                  }
                }
              })
        if(course === null){
                return redirect("/");
        }

        const categories = await db.category.findMany({
                orderBy:{
                        name: "asc"
                }
        })
console.log(categories);

         const requiredFields = [
                course.title,
                course.description,
                course.imageUrl,
                course.price,
                course.categoryId,
                course.chapters.some(chapter => chapter.isPublished),
              ];
        const totalFields = requiredFields.length;
        const completedFields = requiredFields.filter(Boolean).length;
        const completionText = `(${completedFields}/${totalFields})`;


        const isComplete = requiredFields.every(Boolean)

        return ( 
                <>{!course.isPublished && (
                        <Banner
                        label="The course is not published"
                        />
                )}
                        <div className="p-6">
                                <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-y-2">
                                                <h1 className="text-2xl font-medium">Course setup</h1>
                                                <span  className="text-sm text-slate-700">
                                                        Complete all the required fields {completionText}
                                                </span>
                                        </div>
                                        {/*actiunile*/}
                                        <CourseActions
                                                disabled={!isComplete}
                                                courseId={course.id}
                                                isPublished={course.isPublished}
                                        
                                        />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                        <div>
                                                <div className="flex items-center gap-x-2">
                                                <IconBadge icon={LayoutDashboard} />
                                                        <h2 className="text-xl">Customize the course</h2>
                                                </div>


                                                <TitleForm
                                                        initialData={course}
                                                        courseId={course.id}
                                                        />
                                                        <DescriptionForm
                                                        initialData={course}
                                                        courseId={course.id}
                                                        />
                                                        <ImageForm
                                                        initialData={course}
                                                        courseId={course.id}
                                                        />
                                                        <CategoryForm
                                                        initialData={course}
                                                        courseId={course.id}
                                                        options={categories.map((category) => ({
                                                                label: category.name,
                                                                value: category.id,
                                                        }))}
                                                /> 
                                        </div>
                                        <div className="space-y-6">
                                        <div>
                                                <div className="flex items-center gap-x-2">
                                                        <ListChecks/>
                                                        <h2 className="text-xl">
                                                        Course chapters
                                                        </h2>
                                                </div>
                                                <ChaptersForm
                                                        initialData={course}
                                                        courseId={course.id}
                                                />
                                                </div>
                                                <div>
                                                <div className="flex items-center gap-x-2">
                                                        <FaDollarSign />
                                                        <h2 className="text-xl">
                                                                Course price
                                                        </h2>
                                                </div>
                                                <PriceForm
                                                        initialData={course}
                                                        courseId={course.id}
                                                />
                                                </div>
                                                <div>
                                                <div className="flex items-center gap-x-2">
                                                        <IconBadge icon={File} />
                                                        <h2 className="text-xl">
                                                                Attachments
                                                        </h2>
                                                </div>
                                                <AttachmentForm
                                                        initialData={course}
                                                        courseId={course.id}
                                                />
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
         );
}

 
export default CourseIdPage;