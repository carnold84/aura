import { ProjectImage } from "../../../types";
import { Database } from "../database.types";

export type ProjectImageData =
  Database["public"]["Tables"]["projects_images"]["Row"];

export const mapProjectImage = (data: ProjectImageData): ProjectImage => {
  return {
    imageId: data.image_id,
    projectId: data.project_id,
  };
};
