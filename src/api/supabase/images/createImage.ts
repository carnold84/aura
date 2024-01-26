import { client } from "..";
import { CreateImage, Image } from "../../types";

const createImage = async (image: CreateImage) => {
  if (image) {
    console.log(image);

    const { data, error } = await client.storage
      .from("images")
      .upload("avatar1.png", image.url, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    /* const fileName = "";
      const ext = "";

      const blob = await fetch(image.url).then((resp) => resp.blob());

      const { data, error } = await supabase
        .storage
        .from('images')
        .copy("", blob)

        const { publicURL } = supabase.storage.from("images").getPublicUrl(`${fileName}.${ext}`)
      
        const payload = {
        description: image.description,
        name: image.name,
        url: image.url,
      };

        const { data, error, status } = await supabase
          .from("images")
          .insert(payload)
          .select();

      if (error) {
        throw error;
      }

      if (status !== 201 || data === null) {
        throw new Error("Could not fetch image");
      }

      const newImage = mapDataToImage(data[0]); */

    return Promise.resolve({} as Image);
  } else {
    throw new Error("Image is required");
  }
};

export default createImage;
