"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
// import { isTeacher } from "@/lib/teacher";

// import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isMentorPage = pathname?.startsWith("/mentor");
  const isCoursePage = pathname?.includes("/courses");
  const isPlayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isMentorPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit mentor mode
            </Button>
          </Link>
        ) : (
          <Link href="/mentor/courses">
            <Button size="sm" variant="ghost">
              Become a mentor
            </Button>
          </Link>
        ) }
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
  )
}