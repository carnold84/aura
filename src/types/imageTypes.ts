import { Project } from "./projectTypes";

export interface Image {
  createdAt: string;
  description: string | null;
  height: number;
  id: string;
  name: string;
  projects: Project[];
  srcUrl: string;
  rawUrl: string;
  updatedAt: string;
  url: string;
  userId: string;
  width: number;
}

export type CreateImage = Omit<
  Image,
  "createdAt" | "id" | "projects" | "srcUrl" | "updatedAt" | "userId"
>;

export type UpdateImage = Omit<
  Image,
  "createdAt" | "projects" | "srcUrl" | "updatedAt" | "url" | "userId"
>;
