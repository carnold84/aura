import { ProjectWithImages } from "../types";
import { State } from "./store";

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

type Payload = {
  REMOVE_PROJECT: ProjectWithImages;
  SET_PROJECT: ProjectWithImages;
  SET_PROJECTS: ProjectWithImages[];
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

interface NormaliseProjectsArgs {
  projects: ProjectWithImages[];
  state: State;
}

const normaliseProjects = ({ projects, state }: NormaliseProjectsArgs) => {
  const data: State = { ...state };

  projects.forEach((project) => {
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

  return data;
};

const projectReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_PROJECTS": {
      const data = normaliseProjects({
        projects: action.payload,
        state,
      });
      data.projects.isLoaded = true;

      return data;
    }

    case "SET_PROJECT": {
      const data = normaliseProjects({
        projects: [action.payload],
        state,
      });

      return data;
    }

    case "REMOVE_PROJECT": {
      const data = { ...state };

      data.projects.data.delete(action.payload.id);
      data.projectsImages.filter(
        ({ projectId }) => projectId !== action.payload.id,
      );

      return data;
    }

    default:
      return state;
  }
};

export default projectReducer;
