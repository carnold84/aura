import { Image, imageSchema } from "../../types";
import { client } from "../client";
import { mapDataToImage } from "../utils";

const getImage = async (id?: string): Promise<Image | null> => {
  if (id) {
    const { data, error, status } = await client
      .from("images")
      .select()
      .eq("id", id);

    if (error) {
      throw error;
    }

    if (status !== 200) {
      throw new Error("Could not fetch image");
    }

    if (data?.[0]) {
      const image = mapDataToImage(data[0]);

      imageSchema.parse(image);

      const result = imageSchema.safeParse(image);
      if (!result.success) {
        return Promise.reject(result.error);
      } else {
        return Promise.resolve(image);
      }
    }

    return Promise.resolve(null);
  } else {
    throw new Error("Image id is required");
  }
};

export default getImage;
