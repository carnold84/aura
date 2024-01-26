import { Image, ImageSchema } from "../../types";
import { client } from "../client";
import { mapDataToImage } from "./utils";

const getImages = async (): Promise<Image[] | null> => {
  const { data, error, status } = await client.from("images").select();

  if (error) {
    throw error;
  }

  if (status !== 200) {
    throw new Error("Could not fetch images");
  }

  if (data) {
    const images =
      data?.map((imageData) => {
        return mapDataToImage(imageData);
      }) || [];

    const result = ImageSchema.array().safeParse(images);
    if (!result.success) {
      return Promise.reject(result.error);
    } else {
      return Promise.resolve(images);
    }
  }

  return Promise.resolve(null);
};
export default getImages;
