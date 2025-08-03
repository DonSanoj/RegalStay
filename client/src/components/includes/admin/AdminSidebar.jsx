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

const data = {
  user: {
    name: "Hotel Admin",
    email: "admin@hotel.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
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

export function AdminSidebar({
  ...props
}) {
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
