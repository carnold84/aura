import { Image } from "../../../types";
import { Database } from "../database.types";
import { ProjectData, mapProject } from "../projects/utils";

export type ImageData = Database["public"]["Tables"]["images"]["Row"] & {
  projects?: ProjectData[];
};

export const mapImage = (data: ImageData): Image => {
  return {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    name: data.name,
    projects: data.projects?.map((data) => mapProject(data)) ?? [],
    srcUrl: data.src_url,
    updatedAt: data.updated_at,
    url: `${import.meta.env.VITE_API_URL}/storage/v1/object/public/images/${data.url}`,
    userId: data.user_id,
  };
};
