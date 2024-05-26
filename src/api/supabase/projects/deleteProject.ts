import { Project } from "../../../types";
import { client } from "../client";

const deleteProject = async (project: Project): Promise<Project> => {
  if (project) {
    const { error: linksError, status: linksStatus } = await client
      .from("projects_images")
      .delete()
      .eq("project_id", project.id);

    if (linksError) {
      throw linksError;
    }

    if (linksStatus !== 204) {
      throw new Error("Could not delete project");
    }

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
