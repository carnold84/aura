import { ProjectWithImages } from "../../../types";
import { client } from "../client";

const deleteProject = async (
  project: ProjectWithImages,
): Promise<ProjectWithImages> => {
  if (project) {
    const { error, status } = await client
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (error) {
      throw error;
    }

    if (status !== 204) {
      throw new Error("Could not delete project");
    }

    return Promise.resolve(project);
  } else {
    throw new Error("Project is required");
  }
};

export default deleteProject;
