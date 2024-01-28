import { Database } from "./database.types";

export const mapDataToListProject = (
  data: Database["public"]["Tables"]["projects"]["Row"],
) => {
  const project = {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    imageUrl: data.image_url ?? null,
    name: data.name,
    updatedAt: data.updated_at,
    userId: data.user_id,
  };

  return project;
};

type ProjectData = Database["public"]["Tables"]["projects"]["Row"] & {
  images: Database["public"]["Tables"]["images"]["Row"][];
};

export const mapDataToProject = (data: ProjectData) => {
  const project = {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    images: data.images.map(mapDataToImage),
    imageUrl: data.image_url ?? null,
    name: data.name,
    updatedAt: data.updated_at,
    userId: data.user_id,
  };

  return project;
};

export const mapDataToImage = (
  data: Database["public"]["Tables"]["images"]["Row"],
) => {
  const image = {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    name: data.name,
    srcUrl: data.src_url,
    updatedAt: data.updated_at,
    url: `${import.meta.env.VITE_API_URL}/storage/v1/object/public/images/${data.url}`,
    userId: data.user_id,
  };

  return image;
};

export const mapDataToProjectImage = (
  data: Database["public"]["Tables"]["projects_images"]["Row"],
) => {
  const projectImage = {
    createdAt: data.created_at,
    imageId: data.image_id,
    projectId: data.project_id,
    userId: data.user_id,
  };

  return projectImage;
};
