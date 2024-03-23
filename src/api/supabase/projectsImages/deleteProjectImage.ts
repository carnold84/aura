import { ImageWithProjects, ProjectWithImages } from "../../../types";
import { ProjectImage } from "../../../types/projectImageTypes";
import { client } from "../client";

const deleteProjectImage = async (
  image: ImageWithProjects,
  project: ProjectWithImages,
): Promise<ProjectImage> => {
  if (image && project) {
    const { error, status } = await client
      .from("projects_images")
      .delete()
      .eq("image_id", image.id)
      .eq("project_id", project.id);

    if (error) {
      throw error;
    }

    if (status !== 204) {
      throw new Error("Could not delete project image");
    }

    return Promise.resolve({
      imageId: image.id,
      projectId: project.id,
    });
  } else {
    throw new Error("Project and image are required");
  }
};

export default deleteProjectImage;
