import { CreateProjectImage, ProjectImage } from "../../../types";
import { client } from "../client";
import { mapProjectImage } from "./utils";

const createProjectImage = async ({
  imageId,
  projectId,
}: CreateProjectImage): Promise<ProjectImage> => {
  if (imageId && projectId) {
    const payload = {
      image_id: imageId,
      project_id: projectId,
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
