import { formatRelative } from "date-fns";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Image } from "../../types";
import Card from "../Card";

interface ImageCardProps {
  className?: string;
  image: Image;
  to: string;
}

const ImageCard = ({ image, to, ...rest }: ImageCardProps) => {
  const updated = useMemo(() => {
    return formatRelative(image.updatedAt, Date.now());
  }, [image.updatedAt]);
  return (
    <Card {...rest}>
      <Link to={to}>
        <Card.Img src={image.url} />
      </Link>
      <Card.Content className="gap-1">
        <Card.Title className="hover:text-primary-700">
          <Link to={to}>{image.name}</Link>
        </Card.Title>
        <p className="font-display text-xs uppercase text-neutral-400">
          Updated {updated}
        </p>
      </Card.Content>
    </Card>
  );
};

export default ImageCard;
