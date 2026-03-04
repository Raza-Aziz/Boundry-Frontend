import ProfileForm from "../components/profile/ProfileForm";

export default function ProfileSettingsPage() {
  return (
    <>
      {/* Main Content Area */}
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
    </>
  );
}
