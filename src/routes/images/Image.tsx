import { useParams } from "react-router-dom";

import useDeleteImage from "../../hooks/useDeleteImage";
import useImage from "../../hooks/useImage";
import { Image } from "../../api/types";
import useBack from "../../hooks/useBack";

const Image = () => {
  const { imageId } = useParams();
  const back = useBack("/images");
  const { data: image, isError, isLoading } = useImage(imageId);
  const { deleteImage, isDeleting } = useDeleteImage({
    onSuccess: () => {
      back()
    }
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
      <ImageView image={image} />
    </div>
  );
};

const ImageView = ({ image }: { image: Image }) => {
  console.log(image);

  return (
    <div>
      <h1>{image.name}</h1>
      <img src={image.url} />
    </div>
  );
};

export default Image;
