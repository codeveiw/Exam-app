import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),

  lastName: z.string().min(2, "Last name must be at least 2 characters"),

  username: z.string().min(3, "Username must be at least 3 characters"),


  phone: z.string().min(10, "Please enter a valid phone number"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;