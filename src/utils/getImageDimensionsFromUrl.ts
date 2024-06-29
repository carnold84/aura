interface ImageDimensions {
  height: number;
  width: number;
}

const getImageDimensionsFromUrl = (url: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    const onLoad = () => {
      resolve({
        height: img.height,
        width: img.width,
      });

      img.removeEventListener("error", onLoad);
      img.removeEventListener("load", onLoad);
    };

    const onError = (err: ErrorEvent) => {
      console.error(err);
      reject(err);

      img.removeEventListener("error", onLoad);
      img.removeEventListener("load", onLoad);
    };

    img.addEventListener("error", onError);
    img.addEventListener("load", onLoad);
    img.src = url;
  });
};

export default getImageDimensionsFromUrl;
