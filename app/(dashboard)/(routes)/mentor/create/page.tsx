"use client"
import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import{Book} from "lucide-react";
import { FaBook, FaBookOpen } from 'react-icons/fa';



const formSchema = z.object({
        title:z.string().min(1,{
                message: "The title is mandatory to create the course!"
        })
});

const CreatePage = ()=>{
        const router = useRouter();
        const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues:{
                        title: ""
                }
        })
        const { isSubmitting, isValid } = form.formState;

        const onSubmit = async(values : z.infer<typeof formSchema>) =>{
                try {
                        const response = await axios.post("/api/courses", values);
                        router.push(`/mentor/courses/${response.data.id}`);
                        toast.success("The course has been successfully created");
                } 
                catch {
                        toast.error("Something went wrong");                        
                }     
        }


        return (
                <div className="max-w-5xl mx-auto flex md:justify-start h-full p-2">
                       <h1 className="text-2xl">
                                <FaBook className="h-7 w-7 inline-block"/>
                                Create your course:
                       </h1>

                       <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                                <FormField 
                                        control = {form.control}
                                        name = "title"
                                        render = {({field})=>(
                                                <FormItem>
                                                        <FormLabel>
                                                                Course title
                                                        </FormLabel>
                                                        <FormControl>
                                                                <Input 
                                                                        disabled={isSubmitting}
                                                                        {...field}
                                                                />
                                                        </FormControl>
                                                        {/* <FormDescription>
                                                                        Course description
                                                        </FormDescription> */}
                                                        <FormMessage/>
                                                </FormItem>
                                        )}

                                />

                                <div className="flex items-center gap-x-3">
                                        <Link href="/">
                                                <Button type="button" className="border">
                                                        Cancel
                                                </Button>
                                        </Link>
                                        <Button type="submit" disabled={!isValid || isSubmitting} className="border">
                                                Next
                                        </Button>
                                </div>

                                </form>
                       </Form>
                </div>
        )
}

export default CreatePage;