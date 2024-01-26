import { Database } from "../types";

export const mapDataToProject = (
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
