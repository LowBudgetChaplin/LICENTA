"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const userRoutes = [
        {
          icon: Layout,
          label: "Dashboard",
          href: "/",
        },
        {
          icon: Compass,
          label: "Browse",
          href: "/search",
        },
      ];

const mentorRoutes = [
        {
          icon: List,
          label: "Courses",
          href: "/mentor/courses",
        },
        {
          icon: BarChart,
          label: "Analytics",
          href: "/mentor/analytics",
        },
]
  
export const SidebarRoutes = ()=>{
        const pathname = usePathname();
        const isMentorPage = pathname?.includes("/mentor");
        const routes = isMentorPage ? mentorRoutes : userRoutes;

        return (
                <div className="flex flex-col w-full">
                  {routes.map((route) => (
                    <SidebarItem
                      key={route.href}
                      icon={route.icon}
                      label={route.label}
                      href={route.href}
                    />
                  ))}
                </div>
              )
}