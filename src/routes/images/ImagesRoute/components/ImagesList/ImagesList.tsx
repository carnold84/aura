import { useState } from "react";
import { Link } from "react-router-dom";

import UpdateImageForm from "../../../../../containers/UpdateImageForm";
import useImages from "../../../../../hooks/useImages";

const ImagesList = () => {
  const { data, isError, isLoading } = useImages();
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const selectedImage = data.find(({ id }) => id === selectedId) || null;

  return (
    <div>
      <ul>
        {data?.map(({ id, name, url }) => {
          return (
            <li key={id}>
              <Link to={id}>
                <img src={url} width="180px" />
                {name}
              </Link>
              <button onClick={() => setSelectedId(id)}>Edit</button>
            </li>
          );
        })}
      </ul>
      {selectedImage && (
        <div>
          <h3>Edit {selectedImage.name}</h3>
          <UpdateImageForm image={selectedImage} />
        </div>
      )}
    </div>
  );
};

export default ImagesList;
