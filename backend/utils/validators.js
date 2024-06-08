const z = require("zod");

const registerUserSchema = z.object({
  firstName: z.string().min(1, "First Name is required!"),
  lastName: z.string().min(1, "Last Name is required!"),
  username: z.string().email("Invalid email! Please provide correct email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginUserSchema = z.object({
  username: z.string().email("Invalid email! Please provide correct email"),
  password: z.string().min(8, "Please enter the correct password"),
});

const updateUserSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  password: z.optional(
    z.string().min(8, "Password should be of minimium 8 characters")
  ),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};
