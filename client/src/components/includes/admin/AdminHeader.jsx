import React from 'react'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAdminAuthStore } from "@/store/adminAuthStore";

export function AdminHeader() {
    const { adminLogout } = useAdminAuthStore();

    const handleLogout = () => {
        adminLogout();
    };

    return (
        (<header
            className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <h1 className="text-base font-medium">Admin Dashboard</h1>
            </div>

            <div className="flex items-center gap-2 pr-3">
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="hover:bg-destructive hover:text-destructive-foreground bg-red-600"
                >
                    Logout
                </Button>
            </div>
        </header>)
    );
}
