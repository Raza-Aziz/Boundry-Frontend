import { useState, useEffect } from "react";
import { Camera, EyeIcon, EyeOffIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../store/api/userApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../../store/api/authApi";

function ProfileForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [updateProfile, isLoading] = useUpdateProfileMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const { data: currentUser } = useGetCurrentUserQuery();

  const submitHandler = async (values) => {
    try {
      await updateProfile(values).unwrap();

      toast.success("Profile updated successfully", {
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      toast.error(`Updating profile failed :: ${error.message}`, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
      {/* Profile Photo */}
      {/* 1. Use flex-col and items-center to center everything horizontally */}
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {/* 2. The Image Wrapper */}
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-stone-100 dark:border-stone-700">
            <img
              alt="Profile Photo"
              className="w-full h-full object-cover"
              src={currentUser?.avatar.url}
            />
          </div>
        </div>

        {/* 3. The Text Wrapper - text-center ensures the H3 and buttons align under the image */}
        <div className="text-center pt-2">
          <h3 className="text-sm font-medium text-stone-900 dark:text-white font-[Poppins]">
            Profile Photo
          </h3>
          {/* Buttons would go here, also centered by the parent's text-center or flex-center */}
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-[Poppins]"
          >
            Full Name
          </label>
          <input
            id="username"
            type="text"
            defaultValue={user?.username}
            {...register("username")}
            className="w-full bg-[#f7f7f6] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 capitalize rounded-lg px-4 py-2.5 text-sm text-stone-900 dark:text-white focus:ring-1 focus:ring-boundry-primary focus:border-boundry-primary font-[Poppins] placeholder-stone-400 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-[Poppins]"
          >
            Email Address
          </label>
          <input
            defaultValue={user?.email}
            id="email"
            type="email"
            {...register("email")}
            className="w-full bg-[#f7f7f6] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-2.5 text-sm text-stone-900 dark:text-white focus:ring-1 focus:ring-boundry-primary focus:border-boundry-primary font-[Poppins] placeholder-stone-400 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-[Poppins]"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            defaultValue={user?.phone}
            {...register("phone")}
            className="w-full bg-[#f7f7f6] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-2.5 text-sm text-stone-900 dark:text-white focus:ring-1 focus:ring-boundry-primary focus:border-boundry-primary font-[Poppins] placeholder-stone-400 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2 relative">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-[Poppins]"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full bg-[#f7f7f6] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-2.5 text-sm text-stone-900 dark:text-white focus:ring-1 focus:ring-boundry-primary focus:border-boundry-primary font-[Poppins] placeholder-stone-400 outline-none transition-colors"
          />
          <button
            type="button"
            className="absolute right-3 bottom-5 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 flex items-center justify-end gap-4 border-t border-stone-100 dark:border-stone-800">
        <button
          type="button"
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-all font-[Poppins] cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2  px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-boundry-primary hover:bg-boundry-primary-dark shadow-sm hover:shadow-md transition-all font-[Poppins] cursor-pointer"
        >
          {/* {isLoading ? <Spinner data-icon="inline-start" /> : null}*/}
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
