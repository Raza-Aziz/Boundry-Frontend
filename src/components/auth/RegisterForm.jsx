import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema } from "../../lib/validations/authSchema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../store/api/authApi";

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [signup, { isLoading }] = useRegisterMutation();

  const submitHandler = async (values) => {
    try {
      await signup(values).unwrap();
      toast.success("Account successfully created", { position: "top-right" });
      navigate("/");
    } catch (error) {
      toast.error(error.data?.message || "Account creation failed", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* USERNAME FIELD */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="johndoe"
              className={`w-full border-b bg-transparent py-2 outline-none focus:border-[#A3634B] transition-colors ${errors.username ? "border-red-500" : "border-gray-200"}`}
            />
            {errors.username && (
              <p className="text-[10px] text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* EMAIL ADDRESS FIELD */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              className={`w-full border-b bg-transparent py-2 outline-none focus:border-[#A3634B] transition-colors ${errors.email ? "border-red-500" : "border-gray-200"}`}
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PHONE NUMBER FIELD */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              Phone
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="+92XXXXXXXXXX"
              className={`w-full border-b bg-transparent py-2 outline-none focus:border-[#A3634B] transition-colors ${errors.phone ? "border-red-500" : "border-gray-200"}`}
            />
            {errors.phone && (
              <p className="text-[10px] text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className={`w-full border-b bg-transparent py-2 outline-none focus:border-[#A3634B] transition-colors ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#A3634B] py-4 text-white text-xs font-bold uppercase tracking-widest hover:bg-[#8E533E] transition-all disabled:opacity-50 mt-4"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
