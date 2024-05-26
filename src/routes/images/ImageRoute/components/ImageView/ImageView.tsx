import useBack from "../../../../../hooks/useBack";
import useDeleteImage from "../../../../../hooks/useDeleteImage";
import useImage from "../../../../../hooks/useImage";
import LinkProjectList from "../LinkProjectList";

const ImageView = ({ imageId }: { imageId: string }) => {
  const back = useBack("/images");
  const { data: image, isError, isLoading } = useImage({ id: imageId });
  const { deleteImage, isLoading: isDeleting } = useDeleteImage({
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
      <h1>{image.name}</h1>
      {isDeleting ? (
        <p>Deleting...</p>
      ) : (
        <button onClick={() => deleteImage(image)}>Delete</button>
      )}
      <img className="mb-5" src={image.url} />
      <LinkProjectList image={image} />
    </div>
  );
};

export default ImageView;
