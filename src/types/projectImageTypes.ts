import { ImageWithProjects } from "./imageTypes";
import { ProjectWithImages } from "./projectTypes";

export interface ProjectImage {
  imageId: string;
  projectId: string;
}

export type CreateProjectImage = {
  image: ImageWithProjects;
  project: ProjectWithImages;
};

export type DeleteProjectImage = CreateProjectImage;
