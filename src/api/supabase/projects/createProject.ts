import { CreateProject, projectSchema } from "../../types";
import { client } from "../client";
import { mapDataToProject } from "../utils";

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

    if (data?.[0]) {
      const project = mapDataToProject(data[0]);

      const result = projectSchema.safeParse(project);
      if (!result.success) {
        return Promise.reject(result.error);
      } else {
        return Promise.resolve(project);
      }
    }

    return Promise.resolve(null);
  } else {
    throw new Error("Project is required");
  }
};

export default createProject;
