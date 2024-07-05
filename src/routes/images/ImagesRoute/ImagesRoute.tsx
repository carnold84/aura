import { Link } from "react-router-dom";

import ImageCard from "../../../components/ImageCard";
import Page from "../../../components/Page";
import CreateImageDialog from "../../../containers/CreateImageDialog/CreateImageDialog";
import useImages from "../../../hooks/useImages";

const ImagesRoute = () => {
  const { data, isError, isLoading } = useImages();

  return (
    <Page>
      <Page.Header>
        <Page.Title>Images</Page.Title>
        <CreateImageDialog />
      </Page.Header>
      <Page.Content isLoading={isLoading}>
        {isError && <p>An error occurred.</p>}
        {!isLoading && !data && <p>We couldn't find this image.</p>}
        {data?.length === 0 && <p>You don't have any images.</p>}
        {data && (
          <Page.Grid>
            {data?.map((image) => {
              return (
                <Page.GridItem key={image.id}>
                  <Link to={image.id}>
                    <ImageCard image={image} to={image.id} />
                  </Link>
                </Page.GridItem>
              );
            })}
          </Page.Grid>
        )}
      </Page.Content>
    </Page>
  );
};

export default ImagesRoute;
