import { CreateProjectImage, DeleteProjectImage } from "../../types";
import { ActionMap, Actions, State } from "./store";

type Payload = {
  REMOVE_PROJECT_IMAGE: DeleteProjectImage;
  SET_PROJECT_IMAGE: CreateProjectImage;
};

export type ProjectsImagesActions =
  ActionMap<Payload>[keyof ActionMap<Payload>];

export const mapProjectImage = ({ imageId, projectId }: CreateProjectImage) => {
  return {
    id: `${imageId}-${projectId}`,
    imageId,
    projectId,
  };
};

const projectsImagesReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_PROJECT_IMAGE": {
      const data: State = { ...state };
      const nextProjectImage = mapProjectImage(action.payload);

      data.projectsImages.data.set(nextProjectImage.id, nextProjectImage);

      return data;
    }

    case "REMOVE_PROJECT_IMAGE": {
      const data: State = { ...state };
      const nextProjectImage = mapProjectImage(action.payload);

      data.projectsImages.data.delete(nextProjectImage.id);

      return data;
    }

    default:
      return state;
  }
};

export default projectsImagesReducer;
