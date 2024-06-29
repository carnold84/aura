import {
  ComponentPropsWithRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import cn from "../../utils/cn";

export interface ImageProps extends ComponentPropsWithRef<"img"> {
  className?: string;
}

const Image = ({ className, ...rest }: ImageProps) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<"loaded" | "loading">("loading");

  useLayoutEffect(() => {
    if (status === "loaded") {
      console.log(ref.current?.naturalHeight);
    }
  }, [status]);

  const onLoad = () => {
    setStatus("loaded");
  };

  return <img className={cn(className)} onLoad={onLoad} ref={ref} {...rest} />;
};

export default Image;
