import { client } from "..";
import { CreateImage, Image as ImageType } from "../../../types";
import getImageDimensionsFromUrl from "../../../utils/getImageDimensionsFromUrl";
import { mapImage } from "./utils";

const createImage = async (image: CreateImage): Promise<ImageType> => {
  if (image) {
    const blob = await fetch(image.url).then((response) => response.blob());

    const dimensions = await getImageDimensionsFromUrl(
      URL.createObjectURL(blob),
    ).catch(() => {
      throw new Error("Could not get image dimensions");
    });

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
      height: dimensions.height,
      name: image.name,
      src_url: image.url,
      url: imageData.path,
      width: dimensions.width,
    };

    const { data, error, status } = await client
      .from("images")
      .insert(payload)
      .select(
        `
          *,
          projects(*)
        `,
      );

    if (error) {
      throw error;
    }

    if (status !== 201 || data === null) {
      throw new Error("Could not fetch image");
    }

    const newImage = mapImage(data[0]);

    return Promise.resolve(newImage);
  } else {
    throw new Error("Image is required");
  }
};

export default createImage;
