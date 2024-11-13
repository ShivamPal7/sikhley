import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { GetCourses } from "@/actions/get-courses";

import { Categories } from "./_components/categories";
import { CoursesList } from "@/components/courses-list";

export const dynamic = "force-dynamic";

interface SearchPageProps{
    searchParams:{
        title: string ;
        categoryId: string;

    }
};

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const { userId } = await auth();

    if (!userId)
    {
     return redirect("/");
}
    const categories = await db.category.findMany({
        orderBy:{
            name: "asc"
        }
    });

    const courses = await GetCourses({
        userId,
        ...searchParams,
    });

    return ( 
        <>
        <div className="p-6 pt-6 md:hidden md:mb-0 block">
            <SearchInput  />

        </div>
        <div className="p-6 space-y-4 ">
            <Categories 
                items={categories}
            />
            <CoursesList items = {courses}/>
            
        </div>
        </>
     );
}
 
export default SearchPage;