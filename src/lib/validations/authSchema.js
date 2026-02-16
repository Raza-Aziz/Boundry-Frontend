import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter your email address"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
});

export const registerSchema = z
  .object({
    username: z.string().min(3).max(20),
    email: z.email(),
    phone: z.string().regex(/^\+?[1-9][0-9]{7,14}$/, "Invalid phone format"),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
