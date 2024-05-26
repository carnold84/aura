import { Image } from "../../types";
import { mapProjectImage } from "./projectsImagesReducer";
import { ActionMap, Actions, State } from "./store";

type Payload = {
  REMOVE_IMAGE: Image;
  SET_IMAGE: Image;
  SET_IMAGES: Image[];
};

export type ImagesActions = ActionMap<Payload>[keyof ActionMap<Payload>];

interface NormaliseImagesArgs {
  images: Image[];
  state: State;
}

const normaliseImages = ({ images, state }: NormaliseImagesArgs) => {
  const data: State = { ...state };

  images.forEach((image) => {
    image.projects.forEach((project) => {
      data.projects.data.set(project.id, project);
      const nextProjectImage = mapProjectImage({
        imageId: image.id,
        projectId: project.id,
      });
      data.projectsImages.data.set(nextProjectImage.id, nextProjectImage);
    });
    const nextImage = {
      ...image,
      projects: [],
    };
    data.images.data.set(nextImage.id, nextImage);
  });

  return data;
};

const imagesReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_IMAGES": {
      const data = normaliseImages({
        images: action.payload,
        state,
      });
      data.images.isLoaded = true;

      return data;
    }

    case "SET_IMAGE": {
      const data = normaliseImages({
        images: [action.payload],
        state,
      });

      return data;
    }

    case "REMOVE_IMAGE": {
      const data = { ...state };

      data.images.data.delete(action.payload.id);
      data.projectsImages.data.forEach(({ id, imageId }) => {
        if (imageId !== action.payload.id) {
          data.projectsImages.data.delete(id);
        }
      });

      return data;
    }

    default:
      return state;
  }
};

export default imagesReducer;
