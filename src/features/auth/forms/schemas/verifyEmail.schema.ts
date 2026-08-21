import {z} from "zod"
export const verifyEmailSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6, { message: "OTP must be 6 digits" }),
  })
  export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>