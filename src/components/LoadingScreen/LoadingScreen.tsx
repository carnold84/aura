import Spinner from "../Spinner";

const LoadingScreen = () => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
