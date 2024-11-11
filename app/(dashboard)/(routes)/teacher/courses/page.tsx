import { DataTable } from "./_components/data-table";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



const CoursesPage = async () => {
 const { userId } = await auth();

 if (!userId) {
    return redirect("/");
 }

 const Course = await db.course.findMany({
 where: {
    userId,
 },
  orderBy: {
    createdAt: "desc",
  },
 });

    return (
        <div className="p-6">
        <DataTable columns={columns} data={Course} />
        </div>
    )
}
export default CoursesPage;