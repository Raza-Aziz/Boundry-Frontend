import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/validations/authSchema";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../store/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { MailIcon, KeyRound } from "lucide-react";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (values) => {
    try {
      await login(values).unwrap();
      toast.success("Successfully logged in. Welcome back to Boundry", {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.data?.message || "Authentication failed", {
        position: "top-right",
      });
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submitHandler)} className="w-full space-y-6">
        {/* EMAIL FIELD */}
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Email Address
        </label>
        <div className="relative">
          <MailIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm font-[Poppins] bg-[#ffffff] border-2 border-black focus:ring-0 transition-colors ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}

        {/* PASSWORD FIELD */}
        <div>
          <div className="flex justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Password
            </label>
            {/* TODO: Add functionality to FORGOT PASSWORD button */}
            <button
              className="text-xs text-[#A3634B] font-[Poppins] cursor-pointer hover:no-underline"
              type="button"
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <KeyRound
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm font-[Poppins] bg-[#ffffff] border-2 border-black focus:ring-0 transition-colors ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex mt-8 cursor-pointer justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#A3634B] hover:bg-[#8E533E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 font-[Poppins] tracking-wide"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
