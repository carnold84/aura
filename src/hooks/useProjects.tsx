import { useQuery } from "@tanstack/react-query";

import { getProjects } from "../api";

const useProjects = () => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  return { data, error, isError, isLoading, status };
};

export default useProjects;
