import { client } from "..";
import { Image } from "../../types";

const deleteImage = async (image: Image) => {
  if (image) {
    const { error: imageError } = await client.storage
      .from("images")
      .remove([image.url]);

    if (imageError) {
      throw imageError;
    }

    const { error } = await client.from("images").delete().eq("id", image.id);

    if (error) {
      throw error;
    }

    return Promise.resolve(image);
  } else {
    throw new Error("Image is required");
  }
};

export default deleteImage;
