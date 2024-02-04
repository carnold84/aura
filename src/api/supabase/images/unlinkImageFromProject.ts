import { client } from "..";
import { Image, Project } from "../../types";

const unlinkImageFromProject = async (
  image: Image,
  project: Project,
): Promise<{ image: Image; project: Project }> => {
  if (image) {
    const { error, status } = await client
      .from("projects_images")
      .delete()
      .eq("image_id", image.id)
      .eq("project_id", project.id);

    if (error) {
      throw error;
    }

    if (status !== 204) {
      throw new Error("Could not unlink project");
    }

    return Promise.resolve({ image, project });
  } else {
    throw new Error("Image is required");
  }
};

export default unlinkImageFromProject;
