import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/validations/authSchema";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../store/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

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
        <input
          {...register("email")}
          type="email"
          placeholder="name@example.com"
          className={`w-full border-b bg-transparent py-2 outline-none focus:border-[#A3634B] transition-colors ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}

        {/* PASSWORD FIELD */}
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Password
        </label>
        <button
          className="text-xs text-[#A3634B] uppercase hover:underline"
          type="button"
        >
          Forgot Password?
        </button>

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full border-b bg-transparent py-2 outline-none focus:border-[#A3634B] transition-colors ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 bottom-2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}

        {/* REMEMBER ME */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="remember" className="accent-[#A3634B]" />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#A3634B] py-3 text-white font-medium hover:bg-[#8E533E] transition-all disabled:opacity-50"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
