import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { GetCourses } from "@/actions/get-courses";

import { Categories } from "./_components/categories";
import { CoursesList } from "@/components/courses-list";
import { CategoryListSkeleton } from "@/components/category-list-skeleton";
import { CourseSkeleton } from "@/components/courses-skeleton";

export const dynamic = "force-dynamic";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
};

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    return (
        <>
            <div className="p-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4">
                <Suspense fallback={<CategoryListSkeleton />}>
                    <CategoriesLoader />
                </Suspense>
                <Suspense fallback={<CourseSkeleton />}>
                    <CoursesLoader userId={userId} searchParams={searchParams} />
                </Suspense>
            </div>
        </>
    );
}

// Separate async component for categories
const CategoriesLoader = async () => {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return <Categories items={categories} />;
}

// Separate async component for courses
const CoursesLoader = async ({
    userId,
    searchParams
}: {
    userId: string;
    searchParams: { title: string; categoryId: string; }
}) => {
    const courses = await GetCourses({
        userId,
        ...searchParams,
    });

    return <CoursesList items={courses} />;
}

export default SearchPage;