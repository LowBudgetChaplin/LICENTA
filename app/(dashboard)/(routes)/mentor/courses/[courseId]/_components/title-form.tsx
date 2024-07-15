"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PencilIcon, PencilLine, PencilLineIcon } from "lucide-react";
import { FaPencilAlt, FaPencilRuler } from "react-icons/fa";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {Form, FormControl, FormField, FormItem,FormMessage} from "@/components/ui/form";


const formSchema = z.object({
        title: z.string().min(1, {
          message: "Title is required",
        }),
      });

      

interface TitleFormProps {
        initialData: {
          title: string;
        };
        courseId: string;
      };



export  const TitleForm =({
        initialData,
        courseId
}: TitleFormProps)=>{
        const router = useRouter();
        const [isEditing, setIsEditing] = useState(false);

        const toggleEdit = () => setIsEditing(
                (current) => !current
        );



        const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: initialData,
              });
        const { isSubmitting, isValid } = form.formState;

        const onSubmit = async (values: z.infer<typeof formSchema>) => {
                try {
                                await axios.patch(`/api/courses/${courseId}`, values);
                                toast.success("The course has been updated");
                                toggleEdit();
                                router.refresh();
                      } catch {
                                toast.error("Something went wrong");
                      }
              }


        return (
                <div className="mt-6 border bg-slate-100 rounded-md p-4">
                        <div className="font-medium flex items-center justify-between">
                                Course name
                                <Button onClick={toggleEdit} className="mr-2">
                                        {isEditing ? (
                                                <>Cancel</>
                                        ):(
                                                <>
                                                        <h1 className="mr-2">
                                                                Edit title
                                                        </h1>
                                                        <PencilLineIcon className="h-5 w-5"/>
                                                </>
                                        )}

                                
                                </Button>
                        </div>
                        <div>
                                {!isEditing && (
                                        <p className="text-sm mt-2">
                                                {initialData.title}
                                        </p>
                                )}
                                {
                                        isEditing && (
                                                <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(onSubmit)}
                                                        className="space-y-4 mt-4">
                                                                <FormField control={form.control} name="title" render={({ field})=>(
                                                                        <FormItem>
                                                                                <FormControl>
                                                                                        <Input disabled={isSubmitting} placeholder="" {...field}/>
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                        </FormItem>
                                                                )}/>
                                                                <div className="flex items-center">
                                                                <Button
                                                                        disabled={!isValid || isSubmitting}
                                                                        type="submit"
                                                                >
                                                                        Save
                                                                </Button>
                                                                </div>
                                                        </form>
                                                </Form>
                                        )
                                }
                        </div>
                </div>
        )
}