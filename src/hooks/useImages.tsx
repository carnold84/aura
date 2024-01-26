import { useQuery } from "@tanstack/react-query";

import { getImages } from "../api";

const useImages = () => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ["images"],
    queryFn: () => getImages(),
  });

  return { data, error, isError, isLoading, status };
};

export default useImages;
