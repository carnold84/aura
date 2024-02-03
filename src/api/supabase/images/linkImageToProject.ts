import { client } from "..";
import { Image, Project, ProjectImage } from "../../types";
import { mapProjectImage } from "./utils";

const linkImageToProject = async (
  image: Image,
  project: Project,
): Promise<ProjectImage> => {
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

    const projectImage = mapProjectImage(data[0]);

    return Promise.resolve(projectImage);
  } else {
    throw new Error("Image is required");
  }
};

export default linkImageToProject;
