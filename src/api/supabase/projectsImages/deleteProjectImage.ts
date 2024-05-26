import { DeleteProjectImage, ProjectImage } from "../../../types";
import { client } from "../client";

const deleteProjectImage = async ({
  imageId,
  projectId,
}: DeleteProjectImage): Promise<ProjectImage> => {
  if (imageId && projectId) {
    const { error, status } = await client
      .from("projects_images")
      .delete()
      .eq("image_id", imageId)
      .eq("project_id", projectId);

    if (error) {
      throw error;
    }

    if (status !== 204) {
      throw new Error("Could not delete project image");
    }

    return Promise.resolve({
      id: "",
      imageId,
      projectId,
    });
  } else {
    throw new Error("Project and image are required");
  }
};

export default deleteProjectImage;
