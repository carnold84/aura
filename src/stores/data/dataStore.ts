import { create } from "zustand";

import createImagesSlice, { ImagesSlice } from "./slices/images";
import createProjectsSlice, { ProjectsSlice } from "./slices/projects";
import createProjectsImagesSlice, {
  ProjectsImagesSlice,
} from "./slices/projectsImages";

const useDataStore = create<
  ImagesSlice & ProjectsSlice & ProjectsImagesSlice
>()((...a) => ({
  ...createImagesSlice(...a),
  ...createProjectsSlice(...a),
  ...createProjectsImagesSlice(...a),
}));

export default useDataStore;
