import { Dispatch, ReactNode, createContext, useReducer } from "react";

import { Image, Project, ProjectImage } from "../../types";
import imagesReducer, { ImagesActions } from "./imagesReducer";
import projectsImagesReducer, {
  ProjectsImagesActions,
} from "./projectsImagesReducer";
import projectsReducer, { ProjectsActions } from "./projectsReducer";

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Actions = ImagesActions | ProjectsActions | ProjectsImagesActions;

interface DataSet<T> {
  data: Map<string, T>;
  isLoaded: boolean;
}

export interface State {
  images: DataSet<Image>;
  projects: DataSet<Project>;
  projectsImages: ProjectsImages;
}

export type ProjectsImages = ProjectImage[];

const initialState: State = {
  images: {
    data: new Map(),
    isLoaded: false,
  },
  projects: {
    data: new Map(),
    isLoaded: false,
  },
  projectsImages: [],
};

export const DataContext = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface DataProviderProps {
  children: ReactNode;
}

const mainReducer = (state: State, action: Actions) => ({
  ...imagesReducer(state, action),
  ...projectsReducer(state, action),
  ...projectsImagesReducer(state, action),
});

const DataProvider = ({ children }: DataProviderProps) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
