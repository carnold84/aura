import { useContext } from "react";

import { DataContext } from "../stores/store";

const useStore = () => {
  return useContext(DataContext);
};

export default useStore;
