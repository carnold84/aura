import { client } from "..";
import { CreateImage, imageSchema } from "../../types";
import { mapDataToImage } from "../utils";

const createImage = async (image: CreateImage) => {
  if (image) {
    const blob = await fetch(image.url).then((response) => response.blob());

    const d = new Date();
    const time = d.getTime();

    const { data: imageData, error: imageError } = await client.storage
      .from("images")
      .upload(`${time}`, blob, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imageError) {
      throw imageError;
    }

    const payload = {
      description: image.description,
      name: image.name,
      src_url: image.url,
      url: imageData.path,
    };

    const { data, error, status } = await client
      .from("images")
      .insert(payload)
      .select();

    if (error) {
      throw error;
    }

    if (status !== 201 || data === null) {
      throw new Error("Could not fetch image");
    }

    if (data?.[0]) {
      const image = mapDataToImage(data[0]);

      const result = imageSchema.safeParse(image);
      if (!result.success) {
        return Promise.reject(result.error);
      } else {
        return Promise.resolve(image);
      }
    }
    return Promise.resolve(null);
  } else {
    throw new Error("Image is required");
  }
};

export default createImage;
