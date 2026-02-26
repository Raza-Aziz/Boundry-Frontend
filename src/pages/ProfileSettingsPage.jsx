import { User, Building2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SidebarMenu from "../components/profile/SidebarMenu";
import ProfileForm from "../components/profile/ProfileForm";

const sidebarLinks = [
  { label: "Profile", icon: User, active: true },
  { label: "My Listings", icon: Building2 },
];

export default function ProfileSettingsPage() {
  return (
    <div className="bg-[#f7f7f6] dark:bg-[#1d1715] text-stone-800 dark:text-stone-200 font-[Inter] antialiased selection:bg-boundry-primary/30 selection:text-boundry-primary-dark min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white font-medium">
            Settings
          </h1>
          <p className="text-stone-500 mt-2 font-[Poppins] text-sm">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>

        {/* Grid Layout: Sidebar + Content */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar */}
          <SidebarMenu sidebarLinks={sidebarLinks} />

          {/* Main Content Area */}
          <main className="col-span-12 lg:col-span-9">
            <div className="bg-white dark:bg-[#2a2422] rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-stone-100 dark:border-stone-800 p-8 md:p-10">
              {/* Section Header */}
              <div className="pb-6 border-b border-stone-100 dark:border-stone-800 mb-8">
                <h2 className="font-serif text-2xl text-stone-900 dark:text-white font-medium">
                  Public Profile
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 font-[Poppins]">
                  This will be displayed on your public profile.
                </p>
              </div>

              {/* Profile Form */}
              <ProfileForm />
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
