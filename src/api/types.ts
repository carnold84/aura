import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
});

const AuthResponse = z.object({
  error: z.string().optional(),
  message: z.string(),
  user: UserSchema,
});

export type AuthResponse = z.infer<typeof AuthResponse>;

export const ProjectSchema = z.object({
  createdAt: z.string(),
  description: z.union([z.string(), z.null()]),
  id: z.string(),
  imageUrl: z.union([z.string(), z.null()]),
  name: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const CreateProjectSchema = ProjectSchema.omit({
  createdAt: true,
  id: true,
  updatedAt: true,
  userId: true,
});

export type CreateProject = z.infer<typeof CreateProjectSchema>;

export const ImageSchema = z.object({
  createdAt: z.string(),
  description: z.union([z.string(), z.null()]),
  id: z.string(),
  name: z.string(),
  updatedAt: z.string(),
  url: z.string(),
  userId: z.string(),
});

export type Image = z.infer<typeof ImageSchema>;

export const CreateImageSchema = ImageSchema.omit({
  createdAt: true,
  id: true,
  updatedAt: true,
  userId: true,
});

export type CreateImage = z.infer<typeof CreateImageSchema>;
