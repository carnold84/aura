import { useState } from "react";

import { Image } from "../../types";
import cn from "../../utils/cn";
import LoadingScreen from "../LoadingScreen";

export interface ImageRendererProps {
  className?: string;
  image: Image;
}

const getAspectRatio = (height: number, width: number) => {
  let aspectRatio;

  if (width > height) {
    aspectRatio = width / height;
  } else {
    aspectRatio = height / width;
  }

  return aspectRatio;
};

const ImageRenderer = ({ className, image, ...rest }: ImageRendererProps) => {
  const { description, height, url, width } = image;
  const [status, setStatus] = useState<"error" | "loaded" | "loading">(
    "loading",
  );
  const aspectRatio = getAspectRatio(height, width);

  const onError = () => {
    setStatus("error");
  };

  const onLoad = () => {
    setStatus("loaded");
  };

  return (
    <div className="relative border border-neutral-200" style={{ aspectRatio }}>
      {status === "error" && (
        <div className="absolute flex h-full w-full flex-col items-center justify-center gap-2">
          <h3 className="text-lg text-neutral-700">
            Hmmmm, something went wrong.
          </h3>
          <p className="text-base text-neutral-600">
            We can't load this image.
          </p>
        </div>
      )}
      {status === "loading" && <LoadingScreen />}
      {status !== "error" && (
        <img
          alt={description ?? undefined}
          className={cn("max-h-full max-w-full", className)}
          onError={onError}
          onLoad={onLoad}
          src={url}
          style={{ aspectRatio }}
          {...rest}
        />
      )}
    </div>
  );
};

export default ImageRenderer;
