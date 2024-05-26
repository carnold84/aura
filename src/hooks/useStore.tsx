import { useContext } from "react";

import { DataContext } from "../stores/data";

const useStore = () => {
  return useContext(DataContext);
};

export default useStore;
