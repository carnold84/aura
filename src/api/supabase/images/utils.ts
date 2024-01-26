import { Database } from "../types";

export const mapDataToImage = (
  data: Database["public"]["Tables"]["images"]["Row"],
) => {
  const image = {
    createdAt: data.created_at,
    description: data.description ?? null,
    id: data.id,
    name: data.name,
    updatedAt: data.updated_at,
    url: data.url,
    userId: data.user_id,
  };

  return image;
};
