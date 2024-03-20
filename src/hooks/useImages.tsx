import useStore from "../stores/store";
import useQuery from "./useQuery";

const useImages = () => {
  const fetchImages = useStore((store) => store.images.list);
  const { isError, isLoading, status } = useQuery({
    queryFn: fetchImages,
  });
  const images = useStore((store) => store.images.images());

  return {
    data: images,
    isError,
    isLoading,
    status,
  };
};

export default useImages;
