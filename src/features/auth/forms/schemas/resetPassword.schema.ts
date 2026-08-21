import z from "zod";


export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 characters long" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match"})

  export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema> 