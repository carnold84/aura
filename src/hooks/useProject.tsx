import { useCallback } from "react";

import useStore from "../stores/store";
import useQuery from "./useQuery";

const useProject = (id: string) => {
  const get = useStore((store) => store.projects.get);
  const queryFn = useCallback(() => get(id), [get, id]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const project = useStore((store) => store.projects.project(id));

  return {
    data: project,
    isError,
    isLoading,
    status,
  };
};

export default useProject;
