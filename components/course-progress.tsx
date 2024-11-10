import { progress } from "@/components/ui/progress";

interface CourseProgressProps{
    value: number;
    variant?:"default" | "success",
    size?: "default" | "sm";
};

const colorByVariant = {
    deafult: "text-sky-700",
    success: "text-emerald-700",
}
const sizeByVariant = {
    deafult: "text-sm",
    sm: "text-xs",
}

export const CourseProgress =({
    value,
    variant,
    size,
}: CourseProgressProps) => {

    return(
        <div>
            <Progress
                className="h-2"
                value={value}
                variant={variant}


            />
            <p className={cn(
                "font-medium mt-2 text-sky-700",
                colorByVariant[variant || "default"],
                sizeByVariant[size || "default"],

            )}>
                {Math.round(value)}% Complete

            </p>
        </div>
    )
}