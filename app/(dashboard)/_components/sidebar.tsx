import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const  Sidebar = () => {
    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="px-6 pt-8 pb-6">
              <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />

            </div>
        </div>
    );
}