import { Image, UpdateImage } from "../../../types";
import { client } from "../client";
import { mapImage } from "./utils";

const updateImage = async (image: UpdateImage): Promise<Image> => {
  if (image && image.id) {
    const payload = {
      description: image.description,
      name: image.name,
    };
    const { data, error, status } = await client
      .from("images")
      .update(payload)
      .eq("id", image.id)
      .select(
        `
          *,
          projects (*)
        `,
      );

    if (error) {
      throw error;
    }

    if (status !== 200 || data === null) {
      throw new Error("Could not update image");
    }

    const updatedImage = mapImage(data[0]);

    return Promise.resolve(updatedImage);
  } else {
    throw new Error("Image is required");
  }
};

export default updateImage;
