import React from "react";
import { Link, useLocation } from "react-router-dom";

function SidebarMenu({ sidebarLinks }) {
  const location = useLocation(); // FIXED
  return (
    <aside className="col-span-12 lg:col-span-3">
      <nav className="flex flex-col space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          // Logic:
          // 1. If it's the listings path, use startsWith so sub-routes work
          // 2. Otherwise, check for an exact match
          const isActive =
            link.path === "/u/listings"
              ? location.pathname.startsWith("/u/listings")
              : location.pathname === link.path;

          return (
            <Link
              key={link.label}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-white dark:bg-[#2a2422] shadow-sm border border-stone-200 dark:border-stone-700 text-boundry-primary font-medium"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-boundry-primary" : ""}`}
              />
              <span className="font-[Poppins] text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default SidebarMenu;
