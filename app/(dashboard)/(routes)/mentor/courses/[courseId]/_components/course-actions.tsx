"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/exceptions/confirm-modal";
import { useConfettiStore } from "@/hooks/confetti";


interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export const CourseActions = (
       { 
        disabled,
        courseId,
        isPublished,
       }: CourseActionsProps)=>{

        const router = useRouter();
        const [isLoading, setIsLoading] = useState(false);
        const confetti = useConfettiStore();
      
        const onClick = async () => {
          try {
            setIsLoading(true);
      
            if (isPublished) {
              await axios.patch(`/api/courses/${courseId}/unpublish`);
              toast.success("Course is unpublished");
            } else {
              await axios.patch(`/api/courses/${courseId}/publish`);
              toast.success("Course is published");
              confetti.onOpen();
            }
      
            router.refresh();
          } catch {
            toast.error("Something went wrong");
          } finally {
            setIsLoading(false);
          }
        }
        
        const onDelete = async () => {
          try {
            setIsLoading(true);
      
            await axios.delete(`/api/courses/${courseId}`);
      
            toast.success("The course has been deleted");
            router.refresh();
            router.push(`/mentor/courses`);
          } catch {
            toast.error("Something went wrong");
          } finally {
            setIsLoading(false);
          }
        }

        return (
                <div className="flex items-center gap-x-2">
                <Button
                  onClick={onClick}
                  disabled={disabled || isLoading}
                  variant="outline"
                  size="sm"
                >
                  {isPublished ? "Unpublish" : "Publish"}
                </Button>
                <ConfirmModal onConfirm={onDelete}>
                  <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4 ghost" />
                  </Button>
                </ConfirmModal>
              </div>
        )
}