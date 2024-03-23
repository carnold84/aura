import { ImageWithProjects } from "../../../types";
import { client } from "../client";
import { mapImage } from "./utils";

const listImages = async (): Promise<ImageWithProjects[]> => {
  const { data, error, status } = await client.from("images").select();

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
