import { NavArrowDown } from "iconoir-react";
import { ReactNode, useState } from "react";

import DropdownMenu from "../../../../../components/DropdownMenu";
import ImageRenderer from "../../../../../components/ImageRenderer";
import Page from "../../../../../components/Page";
import TextButton from "../../../../../components/TextButton";
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
  const { deleteImage } = useDeleteImage({
    onSuccess: () => {
      back();
    },
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const createdAt = useFormatDateRelative(image?.createdAt);
  const updatedAt = useFormatDateRelative(image?.updatedAt);

  return (
    <Page>
      <Page.Header>
        <Page.Title>{image?.name}</Page.Title>
        {image && (
          <Page.HeaderControls>
            <DropdownMenu>
              <DropdownMenu.Trigger>
                <TextButton iconLeft={<NavArrowDown className="h-5 w-5" />}>
                  Menu
                </TextButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Item onClick={() => setIsEditOpen(true)}>
                  Edit {image.name}
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => setIsDeleteOpen(true)}>
                  Delete {image.name}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Page.HeaderControls>
        )}
      </Page.Header>
      <Page.Content isLoading={isLoading}>
        {isError && <p>An error occurred.</p>}
        {!isLoading && !image && <p>Could not find image.</p>}
        {image && (
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-4xl flex-col gap-5">
              <ImageRenderer image={image} />
              <ul className="flex flex-col gap-4">
                <ImageMeta label="Description" value={image.description} />
                <ImageMeta label="Created" value={createdAt} />
                <ImageMeta label="Updated" value={updatedAt} />
              </ul>
            </div>
          </div>
        )}
      </Page.Content>
      {image && (
        <>
          <DeleteDialog
            isOpen={isDeleteOpen}
            name={image.name}
            onDelete={async () => {
              await deleteImage(image);
            }}
            onOpenChange={() => setIsDeleteOpen(false)}
          />
          <UpdateImageDialog
            image={image}
            isOpen={isEditOpen}
            onOpenChange={(open) => {
              setIsEditOpen(open);
            }}
          />
        </>
      )}
    </Page>
  );
};

export default ImageView;
