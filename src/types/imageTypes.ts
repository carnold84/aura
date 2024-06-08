import { Project } from "./projectTypes";

export interface Image {
  createdAt: string;
  description: string | null;
  id: string;
  name: string;
  projects: Project[];
  srcUrl: string;
  updatedAt: string;
  url: string;
  userId: string;
}

export type CreateImage = Omit<
  Image,
  "createdAt" | "id" | "projects" | "srcUrl" | "updatedAt" | "userId"
>;

export type UpdateImage = Omit<
  Image,
  "createdAt" | "projects" | "srcUrl" | "updatedAt" | "url" | "userId"
>;
