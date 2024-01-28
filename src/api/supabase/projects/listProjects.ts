import { ListProject, listProjectSchema } from "../../types";
import { client } from "../client";
import { mapDataToListProject } from "../utils";

const listProjects = async (): Promise<ListProject[]> => {
  const { data, error, status } = await client.from("projects").select();

  if (error) {
    throw error;
  }

  if (status !== 200) {
    throw new Error("Could not fetch projects");
  }

  const projects = data?.map(mapDataToListProject) || [];

  const result = listProjectSchema.array().safeParse(projects);
  if (!result.success) {
    return Promise.reject(result.error);
  } else {
    return Promise.resolve(projects);
  }
};

export default listProjects;
