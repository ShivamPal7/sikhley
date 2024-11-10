import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
};

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {
        // Fetch purchased courses along with their categories and chapters
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId: userId,
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            },
                        },
                    },
                },
            },
        });

        // Mapping the purchased courses to a typed array (asserting they fit the CourseWithProgressWithCategory type)
        const courses: CourseWithProgressWithCategory[] = purchasedCourses.map((purchase) => {
            const { course } = purchase;
            // Ensure course has category and chapters populated
            return {
                ...course,
                category: course.category || { id: '', name: '' }, // default empty category if null
                chapter: course.chapters || [], // default empty chapters array if null
                progress: null, // Initially, set progress to null
            };
        });

        // Loop through each course and fetch its progress
        for (const course of courses) {
            const progress = await getProgress(userId, course.id);
            course.progress = progress; // Assign progress to each course
        }

        // Filter the courses into completed and in-progress based on the progress
        const completedCourses = courses.filter((course) => course.progress === 100);
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

        // Return the filtered courses
        return {
            completedCourses,
            coursesInProgress,
        };

    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        };
    }
};


// import { db } from "@/lib/db";
// import { Category, Chapter, Course } from "@prisma/client";
// import { getProgress } from "@/actions/get-progress";

// type CourseWithProgressWithCategory = Course & {
//     category: Category;
//     chapter: Chapter[];
//     progress: number | null ;
// };

// type DashboardCourses ={
//     completedCourses:CourseWithProgressWithCategory [];
//     coursesInProgress: CourseWithProgressWithCategory [];
// }


// export const getDashboardCourses = async (userId:string):
//  Promise<DashboardCourses>  => {
//     try{
//         const purchasedCourses = await db.purchase.findMany({
//             where:{
//                 userId:userId,

//             },
//             select:{
//                 course:{
//                     include:{
//                         category:true,
//                         chapters:{
//                             where:{
//                                 isPublished:true,
//                             }
//                         }
//                     }
//                 }
//             }
//         });

//         const courses = purchasedCourses.map((purchase)=> purchase.course) as CourseWithProgressWithCategory[];

//        for (let course of courses){
//         const progress = await getProgress(userId, course.id);
//         course ["progress"] = progress;
//        }
//        const completedCourses = courses.filter((course) => course.progress == 100);
//        const coursesInProgress = courses.filter((course) => (course.progress ?? 0)< 100);

//        return{
//         completedCourses,
//         coursesInProgress,
//        }

//     }catch(error){
//         console.log("[GET_DASHBOARD_COURSES]",error);
//         return{
//             completedCourses: [],
//             coursesInProgress:[],

//         }

//     }

// }