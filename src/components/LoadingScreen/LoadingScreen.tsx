import Spinner from "../Spinner";

const LoadingScreen = () => {
  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
