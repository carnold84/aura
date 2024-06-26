import { Image, ProjectImage } from "../../../types";
import { Database } from "../database.types";
import { ProjectData, mapProject } from "../projects/utils";

export type ImageData = Database["public"]["Tables"]["images"]["Row"];

export const mapImage = (data: ImageData): Image => {
  return {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    name: data.name,
    projects: [],
    srcUrl: data.src_url,
    updatedAt: data.updated_at,
    url: `${import.meta.env.VITE_API_URL}/storage/v1/object/public/images/${data.url}`,
    userId: data.user_id,
  };
};

type ImageWithProjectsData = ImageData & {
  projects: ProjectData[];
};

export const mapImageWithProjects = (data: ImageWithProjectsData): Image => {
  return {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    name: data.name,
    projects: data.projects.map((data) => mapProject(data)),
    srcUrl: data.src_url,
    updatedAt: data.updated_at,
    url: `${import.meta.env.VITE_API_URL}/storage/v1/object/public/images/${data.url}`,
    userId: data.user_id,
  };
};

type ProjectImageData = Database["public"]["Tables"]["projects_images"]["Row"];

export const mapProjectImage = (data: ProjectImageData): ProjectImage => {
  return {
    id: data.id,
    imageId: data.image_id,
    projectId: data.project_id,
  };
};
