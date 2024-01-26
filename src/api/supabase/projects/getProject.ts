import { Project, ProjectSchema } from "../../types";
import { client } from "../client";
import { mapDataToProject } from "./utils";

const getProject = async (id?: string): Promise<Project | null> => {
  if (id) {
    const { data, error, status } = await client
      .from("projects")
      .select()
      .eq("id", id);

    if (error) {
      throw error;
    }

    if (status !== 200) {
      throw new Error("Could not fetch project");
    }

    if (data?.[0]) {
      const project = mapDataToProject(data[0]);

      ProjectSchema.parse(project);

      return Promise.resolve(project);
    }

    return Promise.resolve(null);
  } else {
    throw new Error("Project id is required");
  }
};

export default getProject;
