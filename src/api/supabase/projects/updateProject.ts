import { Project, UpdateProject } from "../../../types";
import { client } from "../client";
import { mapProject } from "./utils";

const updateProject = async (project: UpdateProject): Promise<Project> => {
  if (project && project.id) {
    const payload = {
      description: project.description,
      image_url: project.imageUrl,
      name: project.name,
    };
    const { data, error, status } = await client
      .from("projects")
      .update(payload)
      .eq("id", project.id)
      .select(
        `
          *,
          images (*)
        `,
      );

    if (error) {
      throw error;
    }

    if (status !== 200 || data === null) {
      throw new Error("Could not update project");
    }

    const updatedProject = mapProject(data[0]);

    return Promise.resolve(updatedProject);
  } else {
    throw new Error("Project is required");
  }
};

export default updateProject;
