import { Image } from "../../../types";
import { client } from "../client";
import { mapImage } from "./utils";

const listImages = async (): Promise<Image[]> => {
  const { data, error, status } = await client.from("images").select(
    `
      *,
      projects (
        *
      )
    `,
  );

  if (error) {
    throw error;
  }

  if (status !== 200) {
    throw new Error("Could not fetch images");
  }

  const images =
    data.map((imageData) => {
      return mapImage(imageData);
    }) || [];

  return Promise.resolve(images);
};

export default listImages;
