import { CreateProject, Project } from "../../types";
import { client } from "../client";
import { mapProject } from "./utils";

const createProject = async (project: CreateProject): Promise<Project> => {
  if (project) {
    const payload = {
      description: project.description,
      image_url: project.imageUrl,
      name: project.name,
    };
    const { data, error, status } = await client
      .from("projects")
      .insert(payload)
      .select(
        `
          *,
          images (*)
        `,
      );

    if (error) {
      throw error;
    }

    if (status !== 201 || data === null) {
      throw new Error("Could not fetch project");
    }

    const newProject = mapProject(data[0]);

    return Promise.resolve(newProject);
  } else {
    throw new Error("Project is required");
  }
};

export default createProject;
