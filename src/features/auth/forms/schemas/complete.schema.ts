import { z } from "zod";

export const completeAccountSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
});
export type CompleteAccountSchema = z.infer<typeof completeAccountSchema>;