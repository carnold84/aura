import { ReactNode } from "react";

import Page from "../../../../../components/Page";
import DeleteDialog from "../../../../../containers/DeleteDialog";
import UpdateImageDialog from "../../../../../containers/UpdateImageDialog";
import useBack from "../../../../../hooks/useBack";
import useDeleteImage from "../../../../../hooks/useDeleteImage";
import useFormatDateRelative from "../../../../../hooks/useFormatDateRelative";
import useImage from "../../../../../hooks/useImage";

interface ImageMetaProps {
  label: string;
  value: ReactNode;
}

const ImageMeta = ({ label, value }: ImageMetaProps) => {
  return (
    <li>
      <h4 className="text-sm text-neutral-500">{label}</h4>
      <p className="text-base text-neutral-600">{value}</p>
    </li>
  );
};

interface ImageViewProps {
  imageId: string;
}

const ImageView = ({ imageId }: ImageViewProps) => {
  const back = useBack("/images");
  const { data: image, isError, isLoading } = useImage({ id: imageId });
  const { deleteImage, isLoading: isDeleting } = useDeleteImage({
    onSuccess: () => {
      back();
    },
  });
  const createdAt = useFormatDateRelative(image?.createdAt);
  const updatedAt = useFormatDateRelative(image?.updatedAt);

  return (
    <Page>
      <Page.Header>
        <Page.Title>{image?.name}</Page.Title>
        {image && (
          <Page.HeaderControls>
            <UpdateImageDialog image={image} />
            <DeleteDialog
              isDeleting={isDeleting}
              name={image.name}
              onDelete={() => deleteImage(image)}
            />
          </Page.HeaderControls>
        )}
      </Page.Header>
      <Page.Content isLoading={isLoading}>
        {isError && <p>An error occurred.</p>}
        {!isLoading && !image && <p>Could not find image.</p>}
        {image && (
          <div className="relative flex h-full w-full flex-col gap-8 lg:grid lg:grid-cols-12">
            <div className="relative col-span-9 min-h-80">
              <img
                alt=""
                className="absolute h-full w-full border border-neutral-200 object-contain lg:h-auto lg:max-h-[90vh] lg:w-auto"
                src={image.url}
              />
            </div>
            <div className="col-span-3">
              <ul className="flex flex-col gap-4">
                <ImageMeta label="Description" value={image.description} />
                <ImageMeta label="Created" value={createdAt} />
                <ImageMeta label="Updated" value={updatedAt} />
              </ul>
            </div>
          </div>
        )}
      </Page.Content>
    </Page>
  );
};

export default ImageView;
