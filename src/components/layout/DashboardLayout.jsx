import { Outlet } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import SidebarMenu from "../profile/SidebarMenu";
import { User, Building2 } from "lucide-react";

const sidebarLinks = [
  { label: "Profile", icon: User, path: "/u/profile" },
  { label: "My Listings", icon: Building2, path: "/u/listings" },
];

export default function DashboardLayout() {
  return (
    <div className="bg-boundry-bg-light dark:bg-boundry-bg-dark text-stone-800 dark:text-stone-200 font-[Inter] antialiased min-h-screen flex flex-col">
      <Navbar />

      <div className="grow mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-medium">
            Dashboard
          </h1>
          <p className="text-stone-500 mt-2 font-[Poppins] text-sm">
            Manage your account settings and listings.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar stays fixed while you navigate children */}
          <SidebarMenu sidebarLinks={sidebarLinks} />

          <main className="col-span-12 lg:col-span-9 space-y-6">
            <Outlet /> {/* Child routes render here */}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
