import { db } from "@/lib/db";

interface GetCertificateProps {
    userId: string;
    courseId: string;
};

export const getCertificate = async ({
    userId,
    courseId,
}: GetCertificateProps) => {
    try {
        // Check if the user has purchased the course
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });

        if (!purchase) {
            throw new Error("Course not purchased");
        }

        // Get the course details and price
        const course = await db.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                price: true,
                title: true,
            },
        });

        if (!course) {
            throw new Error("Course not found");
        }

        // Count total chapters in the course
        const totalChapters = await db.chapter.count({
            where: {
                courseId,
                isPublished: true, // Only count published chapters
            },
        });

        if (totalChapters === 0) {
            throw new Error("Course has no chapters");
        }

        // Count completed chapters for the user
        const completedChapters = await db.userProgress.count({
            where: {
                chapter: {
                    courseId,
                },
                userId,
                isCompleted: true,
            },
        });

        // Check if all chapters are completed
        const isCourseCompleted = completedChapters === totalChapters;

        return {
            course,
            purchase,
            isCompleted: isCourseCompleted,
        };

    } catch (error) {
        console.log("[GET_CERTIFICATE]", error);
        return {
            course: null,
            purchase: null,
            isCompleted: false,
        };
    }
};
