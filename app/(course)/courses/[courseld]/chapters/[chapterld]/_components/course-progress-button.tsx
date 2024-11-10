"use client"

import { Import, XCircle } from "lucide-react";
import { useRouter } from "next/router";
import {useState} from "react";
import {Button } from "@/components/ui/button";
import { useConfettistore } from "@/hooks/use-confetti-store";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseProgressProps {
    chapterId: string;
    courseId: string;
    isComplete?: boolean;
    nextChapterId?: string;
};

export const CourseProgressButton =({
    chapterId,
    courseId,
    isComplete,
    nextChapterId
    
    
}: CourseProgressProps) => {
    const router = useRouter();
    const confetti = useConfettistore();
    const [isLoading,SetIsLoading] = useState(false);
    const onClick = async () => {
        try{
            SetIsLoading(true);
            await axios.put('/api/courses/${courseId}/chapters/${chapterId}/progress',{
                isCompletd: !isCompleted

            });

            if(isCompleted && !nextChapterId) {
                confetti.onOpen();
            }
            if(isCompleted && !nextChapterId) {
                router.push('/courses${courseId}?chapters/${nextChapterId}');
            }
            toast.success("progress updated");
            router.refresh();      

        }catch{
         toast.error("Something went wrong");
        }finally{
            SetIsLoading(false);
        }
        }

    }
   const Icon = isCompleted ? XCircle : CheckCircle 
    
    return (
        <Button
        onClick={onClick}
        disabled={isLoading}
        type="button"
        variant={isCompleted ? "outline"  : "success" }
        className="w-full md:w-auto"
        
        
        >
            
            {isComplete ? "Not completed" : "Marks as completed" }
            <Icon className ="h-4 w-4 ml-2" />


        </Button>
    )
}