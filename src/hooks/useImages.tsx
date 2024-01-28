import { useQuery } from "@tanstack/react-query";

import { listImages } from "../api";

const useImages = () => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ["images"],
    queryFn: () => listImages(),
  });

  return { data, error, isError, isLoading, status };
};

export default useImages;
