import { Image, ImageWithProjects, Project, ProjectWithImages } from "../types";

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum DataKey {
  Images = "images",
  Projects = "projects",
  ProjectsImages = "projectsImages",
}

export interface State {
  [DataKey.Images]: {
    data: Map<string, Image>;
    isLoaded: boolean;
  };
  [DataKey.Projects]: {
    data: Map<string, Project>;
    isLoaded: boolean;
  };
  [DataKey.ProjectsImages]: { imageId: string; projectId: string }[];
}

export const initialState = {
  [DataKey.Images]: {
    data: new Map(),
    isLoaded: false,
  },
  [DataKey.Projects]: {
    data: new Map(),
    isLoaded: false,
  },
  [DataKey.ProjectsImages]: [],
};

export enum Types {
  SET_IMAGES = "SET_IMAGES",
  SET_PROJECTS = "SET_PROJECTS",
}

type Payload = {
  [Types.SET_IMAGES]: ImageWithProjects[];
  [Types.SET_PROJECTS]: ProjectWithImages[];
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Types.SET_PROJECTS: {
      const data: State = { ...state };

      action.payload.forEach((project) => {
        project.images.forEach((image) => {
          data.images.data.set(image.id, image);
          data.projectsImages.push({
            imageId: image.id,
            projectId: project.id,
          });
        });
        const nextProject = {
          ...project,
          images: [],
        };
        data.projects.data.set(nextProject.id, nextProject);
      });
      data.projects.isLoaded = true;

      return {
        ...state,
        ...data,
      };
    }
    case Types.SET_IMAGES: {
      const data: State = { ...state };

      action.payload.forEach((image) => {
        image.projects.forEach((project) => {
          data.projects.data.set(project.id, project);
          data.projectsImages.push({
            imageId: image.id,
            projectId: project.id,
          });
        });
        const nextImage = {
          ...image,
          projects: [],
        };
        data.images.data.set(nextImage.id, nextImage);
      });
      data.images.isLoaded = true;

      return {
        ...state,
        ...data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
