import { client } from "..";
import { Image, ListProject, projectImageSchema } from "../../types";
import { mapDataToProjectImage } from "../utils";

const linkImageToProject = async (image: Image, project: ListProject) => {
  if (image && project) {
    const payload = {
      image_id: image.id,
      project_id: project.id,
    };

    const { data, error, status } = await client
      .from("projects_images")
      .insert(payload)
      .select();

    if (error) {
      throw error;
    }

    if (status !== 201 || data === null) {
      throw new Error("Could not link image to project");
    }

    if (data?.[0]) {
      const projectImage = mapDataToProjectImage(data[0]);

      const result = projectImageSchema.safeParse(projectImage);
      if (!result.success) {
        return Promise.reject(result.error);
      } else {
        return Promise.resolve(projectImage);
      }
    }

    return Promise.resolve(null);
  } else {
    throw new Error("Image is required");
  }
};

export default linkImageToProject;
