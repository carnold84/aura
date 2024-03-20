import { useCallback, useEffect, useState } from "react";

type QueryFunction<TData> = () => Promise<TData>;

type UseQueryFunction<TData> = (
  ...args: Parameters<QueryFunction<TData>>
) => void;

type Status = "error" | "idle" | "loading";

interface UseQueryResult {
  isError: boolean;
  isLoading: boolean;
  status: Status;
}

interface UseQueryOptions<TData> {
  queryFn: () => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

const useQuery = <TData,>({
  queryFn,
  onError,
  onSuccess,
}: UseQueryOptions<TData>): UseQueryResult => {
  const [status, setStatus] = useState<Status>("idle");

  const query = useCallback<UseQueryFunction<TData>>(async () => {
    console.log("query");
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
    setStatus("loading");
    try {
      const load = async () => {
        await query();
        setStatus("idle");
      };
      load();
    } catch {
      setStatus("error");
    }
  }, [query]);

  return {
    isError: status === "error",
    isLoading: status === "loading",
    status,
  };
};

export default useQuery;
