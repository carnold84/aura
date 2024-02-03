import { Image } from "./imageTypes";

export interface Project {
  createdAt: string;
  description: string | null;
  id: string;
  imageUrl: string | null;
  name: string;
  updatedAt: string;
  userId: string;
}

export interface ProjectWithImages extends Project {
  images: Image[];
}

export type CreateProject = Omit<
  Project,
  "createdAt" | "id" | "updatedAt" | "userId"
>;
