import { CourseProgress } from "@/components/course-progress";

<CourseProgressButton
    chapterId = {params.chapterId}
    courseId={params.courseId}
    nextChapterId={nextChapter?.id}
    isCompleted={!! userProgress?.isCompleted}
        
  />
