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
  "createdAt" | "id" | "srcUrl" | "updatedAt" | "userId"
>;

export type UpdateImage = Omit<
  Image,
  "createdAt" | "srcUrl" | "updatedAt" | "userId"
>;
