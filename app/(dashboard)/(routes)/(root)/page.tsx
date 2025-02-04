import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/info-card";
import { Suspense } from "react";
import { InfoCardSkeleton } from "./_components/info-card-skeleton";
import { CourseSkeleton } from "@/components/courses-skeleton";

const InfoCards = async ({ userId }: { userId: string }) => {
    const {
        completedCourses,
        coursesInProgress
    } = await getDashboardCourses(userId);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
                icon={Clock}
                label="In Progress"
                numberOfItems={coursesInProgress.length}
            />
            <InfoCard
                icon={CheckCircle}
                label="Completed"
                numberOfItems={completedCourses.length}
                variant="success"
            />
        </div>
    );
}

const CourseList = async ({ userId }: { userId: string }) => {
    const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
    return <CoursesList items={[...coursesInProgress, ...completedCourses]} />;
}

export default async function Dashboard() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    return (
        <div className="p-6 space-y-4">
            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoCardSkeleton />
                    <InfoCardSkeleton />
                </div>
            }>
                <InfoCards userId={userId} />
            </Suspense>
            <Suspense fallback={<CourseSkeleton />}>
                <CourseList userId={userId} />
            </Suspense>
        </div>
    );
}
