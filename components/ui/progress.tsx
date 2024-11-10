import { VariantProps } from "class-variance-authority";

const progressVariants = cva(

    "h-full w-full flex-1 bg-primary transition-all",
    {
        variants:  {
        variant: {
            default: "bg-sky-600",
            success: "bg-emerald-700"
        },
    },
    deafultVariants: {
        variant: "default",

    }
}
)
export interface ProgressProps
   extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>{
        

type CombinedProgressProps = ProgressProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>