import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!ownCourse) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        
        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
        });

        if (!chapter) {
            return NextResponse.json({ error: "Chapter Not Found" }, { status: 404 });
        }

        
        if (chapter.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                },
            });

            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }
        }

        
        const deletedChapter = await db.chapter.delete({
            where: {
                id: params.chapterId,
            },
        });

        
        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            },
        });

        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                },
            });
        }

        return NextResponse.json(deletedChapter);
    } catch (error) {
        console.error("CHAPTER_ID_DELETE Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        
        const body = await req.json().catch(() => null);
        if (!body) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        const { isPublished, videoUrl, ...values } = body;

        
        let muxData = null;
        if (videoUrl) {
            try {
                
                const videoUrlObj = new URL(videoUrl);
                if (!videoUrlObj.protocol.startsWith('http')) {
                    return NextResponse.json({ 
                        error: "Invalid video URL format" 
                    }, { status: 400 });
                }

                
                const existingMuxData = await db.muxData.findFirst({
                    where: {
                        chapterId: params.chapterId,
                    },
                });

                if (existingMuxData) {
                    try {
                        await video.assets.delete(existingMuxData.assetId);
                    } catch (deleteError) {
                        console.log("[MUX Asset Delete Warning]:", deleteError);
                        
                    }
                    
                    await db.muxData.delete({
                        where: {
                            id: existingMuxData.id,
                        },
                    });
                }

                
                console.log("[MUX] Creating new asset for URL:", videoUrl);
                const asset = await video.assets.create({
                    input: videoUrl,
                    playback_policy: ["public"],
                    test: false,
                });

                if (!asset || !asset.id || !asset.playback_ids?.[0]?.id) {
                    throw new Error("Failed to create MUX asset: Invalid response");
                }

                console.log("[MUX] Asset created successfully:", {
                    assetId: asset.id,
                    playbackId: asset.playback_ids[0].id
                });

                
                muxData = await db.muxData.create({
                    data: {
                        chapterId: params.chapterId,
                        assetId: asset.id,
                        playbackId: asset.playback_ids[0].id,
                    },
                });

                
                values.videoUrl = videoUrl;

            } catch (videoError) {
                console.error("[MUX Video Processing Error]:", videoError);
                return NextResponse.json({ 
                    error: "Failed to process video content",
                    details: videoError instanceof Error ? videoError.message : "Unknown error"
                }, { status: 500 });
            }
        }

        
        const updatedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId, 
            },
            data: {
                ...values,
                isPublished: isPublished ?? undefined,
            },
        });

        return NextResponse.json({
            ...updatedChapter,
            muxData: muxData 
        });

    } catch (error) {
        console.error("[COURSES_CHAPTER_ID PATCH Error]:", error);
        return NextResponse.json({ 
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}