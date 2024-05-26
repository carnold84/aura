import { useParams } from "react-router-dom";

import ImageView from "./components/ImageView";

const ImageRoute = () => {
  const { imageId } = useParams();

  if (!imageId) {
    return <p>Could not find image.</p>;
  }

  return <ImageView imageId={imageId} />;
};

export default ImageRoute;
