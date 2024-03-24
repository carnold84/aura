import { Project, ProjectWithImages } from "../../../types";
import { Database } from "../database.types";
import { ImageData, mapImage } from "../images/utils";

export type ProjectData = Database["public"]["Tables"]["projects"]["Row"];

export const mapProject = (data: ProjectData): Project => {
  return {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    imageUrl: data.image_url ?? null,
    name: data.name,
    updatedAt: data.updated_at,
    userId: data.user_id,
  };
};

type ProjectWithImagesData = ProjectData & {
  images: ImageData[];
};

export const mapProjectWithImages = (
  data: ProjectWithImagesData,
): ProjectWithImages => {
  return {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    images: data.images.map((data) => mapImage(data)),
    imageUrl: data.image_url ?? null,
    name: data.name,
    updatedAt: data.updated_at,
    userId: data.user_id,
  };
};
