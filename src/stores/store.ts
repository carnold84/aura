import { create } from "zustand";

import createImagesSlice, { ImagesSlice } from "./slices/images";
import createProjectsSlice, { ProjectsSlice } from "./slices/projects";

const useStore = create<ImagesSlice & ProjectsSlice>()((...a) => ({
  ...createImagesSlice(...a),
  ...createProjectsSlice(...a),
}));

export default useStore;
