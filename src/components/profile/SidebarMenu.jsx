import React from "react";

function SidebarMenu({ sidebarLinks }) {
  return (
    <aside className="col-span-12 lg:col-span-3">
      <nav className="flex flex-col space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                link.active
                  ? "bg-white dark:bg-[#2a2422] shadow-sm border border-stone-200 dark:border-stone-700 text-boundry-primary font-medium"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-[Poppins] text-sm">{link.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default SidebarMenu;
