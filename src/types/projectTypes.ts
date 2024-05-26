import { Image } from "./imageTypes";

export interface Project {
  createdAt: string;
  description: string | null;
  id: string;
  images: Image[];
  imageUrl: string | null;
  name: string;
  updatedAt: string;
  userId: string;
}

export type CreateProject = Omit<
  Project,
  "createdAt" | "id" | "images" | "updatedAt" | "userId"
>;

export type UpdateProject = Omit<
  Project,
  "createdAt" | "images" | "updatedAt" | "userId"
>;
