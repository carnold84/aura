import { useCallback } from "react";

import useStore from "../stores/store";
import useQuery from "./useQuery";

interface UseProjectsOptions {
  sortBy?: "createdAt" | "updatedAt";
}

const useProjects = (options?: UseProjectsOptions) => {
  const list = useStore((store) => store.projects.list);
  const queryFn = useCallback(() => list(), [list]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const projects = useStore((store) => store.projects.projects());

  if (options?.sortBy !== undefined) {
    const sortBy = options?.sortBy;
    return {
      data: projects?.sort((a, b) =>
        a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0,
      ),
      isError,
      isLoading,
      status,
    };
  }

  return {
    data: projects,
    isError,
    isLoading,
    status,
  };
};

export default useProjects;
