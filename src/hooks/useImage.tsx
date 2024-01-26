import { useQuery } from "@tanstack/react-query";

import { getImage } from "../api";

const useImage = (imageId?: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    enabled: !!imageId,
    queryKey: ["images"],
    queryFn: () => getImage(imageId),
  });

  return { data, error, isError, isLoading, status };
};

export default useImage;
