import { ProjectImage } from "../../../types";
import { client } from "../client";

const deleteProjectImage = async (
  projectImage: ProjectImage,
): Promise<ProjectImage> => {
  if (projectImage) {
    const { error, status } = await client
      .from("projects_images")
      .delete()
      .eq("id", projectImage.id);

    if (error) {
      throw error;
    }

    if (status !== 204) {
      throw new Error("Could not delete project image");
    }

    return Promise.resolve(projectImage);
  } else {
    throw new Error("Project is required");
  }
};

export default deleteProjectImage;
