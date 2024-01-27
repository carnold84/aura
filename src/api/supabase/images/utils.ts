import { Database } from "../types";

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
