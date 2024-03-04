import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Username is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(255, { message: "Username must be at most 255 characters long" })
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,255}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit and one special character"
    ),
});

export { loginSchema };
