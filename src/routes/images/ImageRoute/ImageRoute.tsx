import { useParams } from "react-router-dom";

import ImageView from "./components/ImageView";

const ImageRoute = () => {
  const { imageId } = useParams();

  if (!imageId) {
    return <p>Could not find image.</p>;
  }

  return (
    <div>
      <h1>Image</h1>
      <ImageView imageId={imageId} />
    </div>
  );
};

export default ImageRoute;
