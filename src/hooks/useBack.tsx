import { useCallback } from "react";
import { To, useLocation, useNavigate } from "react-router-dom";

const useBack = (fallback: To) => {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(() => {
    if (location.key === "default") {
      navigate(fallback);
    } else {
      navigate(-1);
    }
  }, [fallback, location, navigate]);
};

export default useBack;
