import { Project, ProjectSchema } from "../../types";
import { client } from "../client";
import { mapDataToProject } from "./utils";

const getProjects = async (): Promise<Project[]> => {
  const { data, error, status } = await client.from("projects").select();

  if (error) {
    throw error;
  }

  if (status !== 200) {
    throw new Error("Could not fetch projects");
  }

  const projects =
    data?.map((projectData) => {
      return mapDataToProject(projectData);
    }) || [];

  const result = ProjectSchema.array().safeParse(projects);
  if (!result.success) {
    return Promise.reject(result.error);
  } else {
    return Promise.resolve(projects);
  }
};

export default getProjects;
