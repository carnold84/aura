import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
});

const authResponseSchema = z.object({
  error: z.string().optional(),
  message: z.string(),
  user: userSchema,
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export const imageSchema = z.object({
  createdAt: z.string(),
  description: z.union([z.string(), z.null()]),
  id: z.string(),
  name: z.string(),
  srcUrl: z.string(),
  updatedAt: z.string(),
  url: z.string(),
  userId: z.string(),
});

export type Image = z.infer<typeof imageSchema>;

export const createImageSchema = imageSchema.omit({
  createdAt: true,
  id: true,
  updatedAt: true,
  userId: true,
});

export type CreateImage = z.infer<typeof createImageSchema>;

export const projectSchema = z.object({
  createdAt: z.string(),
  description: z.union([z.string(), z.null()]),
  id: z.string(),
  images: z.array(imageSchema),
  imageUrl: z.union([z.string(), z.null()]),
  name: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export const listProjectSchema = projectSchema.omit({
  images: true,
});

export type ListProject = z.infer<typeof listProjectSchema>;

export const createProjectSchema = projectSchema.omit({
  createdAt: true,
  id: true,
  images: true,
  updatedAt: true,
  userId: true,
});

export type CreateProject = z.infer<typeof createProjectSchema>;

export const projectImageSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  imageId: z.string(),
  projectId: z.string(),
});

export type ProjectImage = z.infer<typeof projectImageSchema>;

export const createProjectImageSchema = projectImageSchema.omit({
  createdAt: true,
  id: true,
  userId: true,
});

export type CreateProjectImage = z.infer<typeof createProjectImageSchema>;
