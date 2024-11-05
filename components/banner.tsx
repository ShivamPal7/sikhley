import { AlertTriangle, CheckCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Warning from "postcss/lib/warning";

const bannerVariants = cva (
    "border text-center p-4 text-sm flex item-center w-full" ,
    {
        variants: {
            variant: {
                    warning:"bg-yellow-200/80 border-yellow-30 text-primary",
                    success:"bg-emerald-700 border-emerald-800 text-secondary" ,

            }
        },
        defaultVariants:{
            variant:"warning",
        }
    }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label:string;
};

const iconmap={
    warning:AlertTriangle,
    success: CheckCheckIcon,

}

export const Banner = ({
    label,
    variant,

}: BannerProps) => {

    const Icon = iconmap[variant || "warning"];

    return (
        <div className={cn(bannerVariants({variant}))}>
            <Icon className="h-4 w-4 mr-2 "/>
            {label}
        </div>
    );
};
