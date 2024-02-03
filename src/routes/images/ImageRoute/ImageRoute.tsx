import { useParams } from "react-router-dom";

import useBack from "../../../hooks/useBack";
import useDeleteImage from "../../../hooks/useDeleteImage";
import useImage from "../../../hooks/useImage";
import ImageView from "./components/ImageView";
import LinkProjectList from "./components/LinkProjectList/LinkProjectList";

const ImageRoute = () => {
  const { imageId } = useParams();
  const back = useBack("/images");
  const { data: image, isError, isLoading } = useImage(imageId);
  const { deleteImage, isDeleting } = useDeleteImage({
    onSuccess: () => {
      back();
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (!image) {
    return <p>Could not find image.</p>;
  }

  return (
    <div>
      <h1>Image</h1>
      {isDeleting ? (
        <p>Deleting...</p>
      ) : (
        <button onClick={() => deleteImage(image)}>Delete</button>
      )}
      <LinkProjectList image={image} />
      <ImageView image={image} />
    </div>
  );
};

export default ImageRoute;
