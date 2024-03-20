import { Project } from "../../../types";
import { client } from "../client";
import { mapProject } from "./utils";

const listProjects = async (): Promise<Project[]> => {
  const { data, error, status } = await client.from("projects").select();

  if (error) {
    throw error;
  }

  if (status !== 200) {
    throw new Error("Could not fetch projects");
  }

  const projects = data.map((data) => mapProject(data)) || [];

  return Promise.resolve(projects);
};

export default listProjects;
