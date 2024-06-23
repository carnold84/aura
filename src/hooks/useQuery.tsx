import { useCallback, useEffect, useState } from "react";

type QueryFunction<TData> = () => Promise<TData>;

type UseQueryFunction<TData> = (
  ...args: Parameters<QueryFunction<TData>>
) => void;

type Status = "error" | "idle" | "loading" | "success";

interface UseQueryResult {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  status: Status;
}

interface UseQueryOptions<TData> {
  isEnabled?: boolean;
  queryFn: () => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

const useQuery = <TData,>({
  isEnabled = true,
  queryFn,
  onError,
  onSuccess,
}: UseQueryOptions<TData>): UseQueryResult => {
  const [status, setStatus] = useState<Status>("idle");

  const query = useCallback<UseQueryFunction<TData>>(async () => {
    setStatus("loading");
    try {
      const response = await queryFn();
      onSuccess && onSuccess(response);

      return response;
    } catch {
      onError && onError(new Error("Could not load "));
    }
  }, [queryFn, onError, onSuccess]);

  useEffect(() => {
    if (isEnabled) {
      setStatus("loading");
      try {
        const load = async () => {
          await query();
          setStatus("success");
        };
        load();
      } catch {
        setStatus("error");
      }
    }
  }, [isEnabled, query]);

  return {
    isError: status === "error",
    isLoading: status === "loading",
    isSuccess: status === "success",
    status,
  };
};

export default useQuery;
