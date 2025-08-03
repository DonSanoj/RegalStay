import * as React from "react"
import {
  BarChartIcon,
  BedDouble,
  HeadsetIcon,
  HelpCircleIcon,
  HotelIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/includes/admin/nav-main"
import { NavSecondary } from "@/components/includes/admin/nav-secondary"
import { NavUser } from "@/components/includes/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAdminAuthStore } from "@/store/adminAuthStore"

export function AdminSidebar({
  ...props
}) {
  const { admin } = useAdminAuthStore();

  // Create user object from admin data with proper admin_id field
  const userData = React.useMemo(() => {
    if (admin) {
      return {
        name: admin.admin_username,
        email: admin.admin_email,
        admin_id: admin.admin_id,
        avatar: "/avatars/admin.jpg",
      };
    }
    return null;
  }, [admin]);

  // Don't render if userData is not available
  if (!userData) {
    return null;
  }

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/admin/${userData.admin_id}/${encodeURIComponent(userData.email)}`,
        icon: LayoutDashboardIcon,
      },
      {
        title: "Rooms Management",
        url: "#",
        icon: BedDouble,
      },
      {
        title: "Analytics",
        url: "#",
        icon: BarChartIcon,
      },
      {
        title: "Bookings",
        url: "#",
        icon: ListIcon,
      },
      {
        title: "Guests",
        url: "#",
        icon: UsersIcon,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: SettingsIcon,
      },
      {
        title: "Contact Developers",
        url: "#",
        icon: HeadsetIcon,
      },
      {
        title: "Search",
        url: "#",
        icon: SearchIcon,
      },
    ],
  }

  return (
    (<Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <HotelIcon className="h-5 w-5" />
                <span className="text-green-500 text-base font-semibold">RegalStay</span><span className="text-white text-base font-semibold">Hotel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>)
  );
}
