export interface ProjectImage {
  id: string;
  imageId: string;
  projectId: string;
}

export type CreateProjectImage = {
  imageId: string;
  projectId: string;
};

export type DeleteProjectImage = CreateProjectImage;
