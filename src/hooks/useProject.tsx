import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import useQuery from "./useQuery";

const useProject = (id: string) => {
  const get = useDataStore((store) => store.projects.get);
  const queryFn = useCallback(() => get(id), [get, id]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const project = useDataStore((store) => store.projects.project(id));

  return {
    data: project,
    isError,
    isLoading,
    status,
  };
};

export default useProject;
