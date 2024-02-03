import { Image } from "../../../../../api/types";

const ImageView = ({ image }: { image: Image }) => {
  return (
    <div>
      <h1>{image.name}</h1>
      <img src={image.url} />
    </div>
  );
};

export default ImageView;
