import { ProjectWithImages } from "../../types";
import { client } from "../client";
import { mapProjectWithImages } from "./utils";

const getProject = async (id?: string): Promise<ProjectWithImages | null> => {
  if (id) {
    const { data, error, status } = await client
      .from("projects")
      .select(
        `
          *,
          images(*)
        `,
      )
      .eq("id", id);

    if (error) {
      throw error;
    }

    if (status !== 200) {
      throw new Error("Could not fetch project");
    }

    if (data?.[0]) {
      const project = mapProjectWithImages(data[0]);

      return Promise.resolve(project);
    }

    return Promise.resolve(null);
  } else {
    throw new Error("Project id is required");
  }
};

export default getProject;
