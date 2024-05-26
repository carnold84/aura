import { ProjectImage } from "../types";
import { ActionMap, Actions, State } from "./store";

type Payload = {
  REMOVE_PROJECT_IMAGE: ProjectImage;
  SET_PROJECT_IMAGE: ProjectImage;
};

export type ProjectsImagesActions =
  ActionMap<Payload>[keyof ActionMap<Payload>];

const projectsImagesReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_PROJECT_IMAGE": {
      return {
        ...state,
        projectsImages: [...state.projectsImages, action.payload],
      };
    }

    case "REMOVE_PROJECT_IMAGE": {
      const projectImage = action.payload;
      return {
        ...state,
        projectsImages: state.projectsImages.filter(
          ({ imageId, projectId }) => {
            return (
              imageId !== projectImage.imageId ||
              projectId !== projectImage.projectId
            );
          },
        ),
      };
    }

    default:
      return state;
  }
};

export default projectsImagesReducer;
