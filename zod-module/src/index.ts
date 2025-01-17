import { z } from "zod";
const signUpInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});

const SignInInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignUpType = z.infer<typeof signUpInputSchema>;
export type SignInType = z.infer<typeof SignInInputSchema>;

const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().default(false),
});

const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type CreateBlogType = z.infer<typeof createBlogSchema>;
export type UpdateBlogType = z.infer<typeof updatePostSchema>;
