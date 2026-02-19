import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../lib/validations/authSchema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../store/api/authApi";
import { MailIcon, User2, KeyRound, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = async (values) => {
    try {
      // Added a phone prefix
      const formattedValues = {
        // rest of the values will be same
        ...values,
        phone: `+92${values.phone}`,
      };

      await signup(formattedValues).unwrap();
      toast.success("Account created successfully", {
        position: "top-right",
        duration: 2000,
      });
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
        {/* USERNAME FIELD */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Username
          </label>
          <div className="relative">
            <User2
              size={20}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              {...register("username")}
              type="username"
              placeholder="John Doe"
              className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm font-[Poppins] bg-[#ffffff] border-2 border-black focus:ring-0 transition-colors ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-red-500 font-[Poppins]">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* EMAIL ADDRESS FIELD */}
        <div>
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
            <p className="text-xs text-red-500 font-[Poppins]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PHONE NUMBER FIELD */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Phone Number
          </label>
          <div className="relative">
            <div className="flex">
              {/* STATIC PREFIX */}
              <div className="flex items-center px-3 rounded-l-lg border-2 border-r-0 border-gray-300 bg-gray-100 text-sm font-[Poppins] text-gray-600">
                +92
              </div>

              {/* INPUT FIELD */}
              <input
                {...register("phone")}
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="3321234567"
                className={`w-full pl-3 pr-4 py-3 rounded-r-lg text-sm font-[Poppins] bg-white border-2 focus:ring-0 transition-colors ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 font-[Poppins]">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* PASSWORD FIELD */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Password
            </label>

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
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-[Poppins]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Confirm Password
            </label>

            <div className="relative">
              <KeyRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm font-[Poppins] bg-[#ffffff] border-2 border-black focus:ring-0 transition-colors ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 bottom-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-[Poppins]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex mt-8 cursor-pointer justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#A3634B] hover:bg-[#8E533E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 font-[Poppins] tracking-wide"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
