import { Dispatch, ReactNode, createContext, useReducer } from "react";

import { Image, Project } from "../types";
import projectReducer, { Actions } from "./projectReducer";

interface DataSet<T> {
  data: Map<string, T>;
  isLoaded: boolean;
}

export interface State {
  images: DataSet<Image>;
  projects: DataSet<Project>;
  projectsImages: ProjectsImages;
}

export interface ProjectImage {
  imageId: string;
  projectId: string;
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
  ...projectReducer(state, action),
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
