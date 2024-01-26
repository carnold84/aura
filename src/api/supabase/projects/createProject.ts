import { CreateProject } from "../../types";
import { client } from "../client";
import { mapDataToProject } from "./utils";

const createProject = async (project: CreateProject) => {
  if (project) {
    const payload = {
      description: project.description,
      image_url: project.imageUrl,
      name: project.name,
    };
    const { data, error, status } = await client
      .from("projects")
      .insert(payload)
      .select();

    if (error) {
      throw error;
    }

    if (status !== 201 || data === null) {
      throw new Error("Could not fetch project");
    }

    const newProject = mapDataToProject(data[0]);

    return Promise.resolve(newProject);
  } else {
    throw new Error("Project is required");
  }
};

export default createProject;
