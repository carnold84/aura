import { Image } from "./imageTypes";
import { Project } from "./projectTypes";

export interface ProjectImage {
  imageId: string;
  projectId: string;
}

export type CreateProjectImage = {
  image: Image;
  project: Project;
};

export type DeleteProjectImage = CreateProjectImage;
