import { Project } from "./projectTypes";

export interface Image {
  createdAt: string;
  description: string | null;
  id: string;
  name: string;
  srcUrl: string;
  updatedAt: string;
  url: string;
  userId: string;
}

export interface ImageWithProjects extends Image {
  projects: Project[];
}

export type CreateImage = Omit<
  Image,
  "createdAt" | "id" | "updatedAt" | "userId"
>;

export type UpdateImage = Omit<Image, "createdAt" | "updatedAt" | "userId">;

export interface ProjectImage {
  createdAt: string;
  id: string;
  imageId: string;
  projectId: string;
  userId: string;
}

export type CreateProjectImage = Omit<ProjectImage, "createdAt" | "userId">;
