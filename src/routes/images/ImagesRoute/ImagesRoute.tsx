import { Link } from "react-router-dom";

import useImages from "../../../hooks/useImages";
import ImagesForm from "./components/ImagesForm";

const ImagesList = () => {
  const { data, isError, isLoading } = useImages();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (data?.length === 0) {
    return <p>You don't have any images.</p>;
  }

  return data?.map(({ id, name, url }) => {
    return (
      <li key={id}>
        <Link to={id}>
          <img src={url} width="180px" />
          {name}
        </Link>
      </li>
    );
  });
};

const ImagesRoute = () => {
  return (
    <div>
      <h1>Images</h1>
      <ImagesForm />
      <ImagesList />
    </div>
  );
};

export default ImagesRoute;
