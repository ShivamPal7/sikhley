"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const confetti = useConfettiStore();

  useEffect(() => {
      new Plyr(videoRef.current, {
        controls: ["play", "progress", "mute", "volume", "fullscreen", "settings", "pip", "fullscreen", ],
      });

      oncanplay: setIsReady(true)
  }, []);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        // Trigger confetti if it's the last chapter
        if (!nextChapterId) {
          confetti.onOpen();
          toast.success("Course completed!");
        } else {
          toast.success("Progress updated");
          router.refresh();
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (

        <video
              ref={videoRef}
              className={cn(!isReady && "hidden")}
              playsInline
              controls
              autoPlay
              muted
              onCanPlay={() => setIsReady(true)}
              onEnded={onEnd}
              title={title}
            >
              <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};