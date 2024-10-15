"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");

    return (
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isPlayerPage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher Mode
                    </Button>
                </Link>
            )}
            <div className="flex items-center justify-center">
                <UserButton afterSignOutUrl="/" />
            </div>  
        </div>
    );
};

// "use client"

// import { UserButton } from "@clerk/nextjs"
// import { usePathname } from "next/navigation"
// import { LogOut } from "lucide-react";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";

// export const NavbarRoutes = () =>{
//     const pathname = usePathname();
    

//     const isTeacherPage = pathname?.startsWith("/teacher");
//     const isPlayerPage = pathname?.includes("/chapter");


//     return(
//         <div className="flex gap-x-2 ml-auto">
//             { isTeacherPage || isPlayerPage ? (
//                 <link href="/">
//                 <Button size="sm" variant="ghost">
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Exit 

//                 </Button></link>
//             ) : (
//                 <link href="/teacher/courses">
//                 <Button size="sm" variant="ghost">
//                     Teacher Mode 
//                 </Button>
//                 </link>
//             )
//         }
//             <UserButton
//             afterSignOutUrl="/"
//             />

//         </div>
//     )
// }