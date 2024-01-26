import { useParams } from "react-router-dom";

import useImage from "../../hooks/useImage";

const Image = () => {
  return (
    <div>
      <h1>Image</h1>
      <ImageView />
    </div>
  );
};

const ImageView = () => {
  const { imageId } = useParams();
  const { data, isError, isLoading } = useImage(imageId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (!data) {
    return <p>Could not find image.</p>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
};

export default Image;
