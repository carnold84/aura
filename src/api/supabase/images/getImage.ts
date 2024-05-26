import { Image } from "../../../types";
import { client } from "../client";
import { mapImage } from "./utils";

const getImage = async (id?: string): Promise<Image | null> => {
  if (id) {
    const { data, error, status } = await client
      .from("images")
      .select(
        `
          *,
          projects(*)
        `,
      )
      .eq("id", id);

    if (error) {
      throw error;
    }

    if (status !== 200) {
      throw new Error("Could not fetch image");
    }

    const image = mapImage(data[0]);

    return Promise.resolve(image);
  } else {
    throw new Error("Image id is required");
  }
};

export default getImage;
