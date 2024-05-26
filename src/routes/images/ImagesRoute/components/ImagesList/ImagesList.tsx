import { Link } from "react-router-dom";

import Grid from "../../../../../components/Grid";
import useImages from "../../../../../hooks/useImages";

const ImagesList = () => {
  const { data, isError, isLoading } = useImages();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred.</p>;
  }

  if (!data) {
    return <p>We couldn't find this image.</p>;
  }

  if (data?.length === 0) {
    return <p>You don't have any images.</p>;
  }

  return (
    <Grid>
      {data?.map(({ id, name, url }) => {
        return (
          <Grid.Item key={id}>
            <Link to={id}>
              <img src={url} width="180px" />
              {name}
            </Link>
          </Grid.Item>
        );
      })}
    </Grid>
  );
};

export default ImagesList;
