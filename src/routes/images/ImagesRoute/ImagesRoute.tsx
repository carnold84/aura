import CreateImageForm from "../../../containers/CreateImageForm/CreateImageForm";
import ImagesList from "./components/ImagesList";

const ImagesRoute = () => {
  return (
    <div>
      <h1>Images</h1>
      <CreateImageForm />
      <ImagesList />
    </div>
  );
};

export default ImagesRoute;
