import Page from "../../../components/Page";
import CreateImageDialog from "../../../containers/CreateImageDialog/CreateImageDialog";
import ImagesList from "./components/ImagesList";

const ImagesRoute = () => {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Images</Page.Title>
        <CreateImageDialog />
      </Page.Header>
      <Page.Content>
        <ImagesList />
      </Page.Content>
    </Page>
  );
};

export default ImagesRoute;
