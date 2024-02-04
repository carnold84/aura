import { CreateProject, Project } from "../../types";
import { client } from "../client";
import { mapProject } from "./utils";

const updateProject = async ({
  id,
  project,
}: {
  id: string;
  project: CreateProject;
}): Promise<Project> => {
  if (id && project) {
    const payload = {
      description: project.description,
      image_url: project.imageUrl,
      name: project.name,
    };
    const { data, error, status } = await client
      .from("projects")
      .update(payload)
      .eq("id", id)
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
      throw new Error("Could not fetch project");
    }

    const updatedProject = mapProject(data[0]);

    return Promise.resolve(updatedProject);
  } else {
    throw new Error("Project is required");
  }
};

export default updateProject;
