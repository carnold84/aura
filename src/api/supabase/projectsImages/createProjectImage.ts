import {
  ImageWithProjects,
  ProjectImage,
  ProjectWithImages,
} from "../../../types";
import { client } from "../client";
import { mapProjectImage } from "./utils";

const createProjectImage = async (
  image: ImageWithProjects,
  project: ProjectWithImages,
): Promise<ProjectImage> => {
  if (image && project) {
    const payload = {
      image_id: image.id,
      project_id: project.id,
    };
    const { data, error, status } = await client
      .from("projects_images")
      .insert(payload)
      .select(`*`);

    if (error) {
      throw error;
    }

    if (status !== 201 || data === null) {
      throw new Error("Could not link project to image");
    }

    const newProjectImage = mapProjectImage(data[0]);

    return Promise.resolve(newProjectImage);
  } else {
    throw new Error("Project and image are required");
  }
};

export default createProjectImage;
