import Page from "../../../../../components/Page";
import Spinner from "../../../../../components/Spinner";
import TextButton from "../../../../../components/TextButton";
import UpdateImageDialog from "../../../../../containers/UpdateImageDialog";
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
    <Page>
      <Page.Header>
        <Page.Title>{image.name}</Page.Title>
        <Page.HeaderControls>
          <UpdateImageDialog image={image} />
          <TextButton className="min-w-14" onClick={() => deleteImage(image)}>
            {isDeleting ? <Spinner size={20} /> : "Delete"}
          </TextButton>
        </Page.HeaderControls>
      </Page.Header>
      <Page.Content>
        <LinkProjectList image={image} />
      </Page.Content>
    </Page>
  );
};

export default ImageView;
