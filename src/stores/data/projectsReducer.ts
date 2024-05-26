import { Project } from "../../types";
import { mapProjectImage } from "./projectsImagesReducer";
import { ActionMap, Actions, State } from "./store";

type Payload = {
  REMOVE_PROJECT: Project;
  SET_PROJECT: Project;
  SET_PROJECTS: Project[];
};

export type ProjectsActions = ActionMap<Payload>[keyof ActionMap<Payload>];

interface NormaliseProjectsArgs {
  projects: Project[];
  state: State;
}

const normaliseProjects = ({ projects, state }: NormaliseProjectsArgs) => {
  const data: State = { ...state };

  projects.forEach((project) => {
    project.images.forEach((image) => {
      data.images.data.set(image.id, image);
      const nextProjectImage = mapProjectImage({
        imageId: image.id,
        projectId: project.id,
      });
      data.projectsImages.data.set(nextProjectImage.id, nextProjectImage);
    });
    const nextProject = {
      ...project,
      images: [],
    };
    data.projects.data.set(nextProject.id, nextProject);
  });

  return data;
};

const projectsReducer = (state: State, action: Actions) => {
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
      data.projectsImages.data.forEach(({ id, projectId }) => {
        if (projectId !== action.payload.id) {
          data.projectsImages.data.delete(id);
        }
      });

      return data;
    }

    default:
      return state;
  }
};

export default projectsReducer;
