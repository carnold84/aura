import { useCallback } from "react";

import useStore from "../stores/store";
import useQuery from "./useQuery";

const useProjects = () => {
  const list = useStore((store) => store.projects.list);
  const queryFn = useCallback(() => list(), [list]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const projects = useStore((store) => store.projects.projects());

  return {
    data: projects,
    isError,
    isLoading,
    status,
  };
};

export default useProjects;
