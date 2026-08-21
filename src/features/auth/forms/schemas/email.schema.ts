import z from "zod";


export const emailSchema = z.object(
    {
        email:z.email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" })
       
    }
)
export type EmailSchema = z.infer<typeof emailSchema>