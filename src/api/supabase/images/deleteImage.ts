import { client } from "..";
import { Image } from "../../../types";

const deleteImage = async (image: Image): Promise<Image> => {
  if (image) {
    const { error: linksError, status: linksStatus } = await client
      .from("projects_images")
      .delete()
      .eq("image_id", image.id);

    if (linksError) {
      throw linksError;
    }

    if (linksStatus !== 204) {
      throw new Error("Could not delete image");
    }

    const { error, status } = await client
      .from("images")
      .delete()
      .eq("id", image.id);

    if (error) {
      throw error;
    }

    if (status !== 204) {
      throw new Error("Could not delete image");
    }

    const { error: imageError } = await client.storage
      .from("images")
      .remove([image.rawUrl]);

    if (imageError) {
      throw imageError;
    }

    return Promise.resolve(image);
  } else {
    throw new Error("Image is required");
  }
};

export default deleteImage;
