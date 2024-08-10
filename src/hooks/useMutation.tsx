import { useCallback, useState } from "react";

type MutateFunction<TPayload, TData> = (payload: TPayload) => Promise<TData>;

type UseMutateFunction<TPayload, TData> = (
  ...args: Parameters<MutateFunction<TPayload, TData>>
) => void;

type Status = "error" | "idle" | "loading" | "success";

interface UseMutationResult<TPayload, TData> {
  mutate: UseMutateFunction<TPayload, TData>;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
  status: Status;
}

interface UseMutationOptions<TPayload, TData> {
  mutationFn: (payload: TPayload) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

const useMutation = <TPayload, TData>({
  mutationFn,
  onError,
  onSuccess,
}: UseMutationOptions<TPayload, TData>): UseMutationResult<TPayload, TData> => {
  const [status, setStatus] = useState<Status>("idle");

  const mutate = useCallback<UseMutateFunction<TPayload, TData>>(
    async (payload) => {
      setStatus("loading");
      try {
        const response = await mutationFn(payload);
        onSuccess && onSuccess(response);
        setStatus("success");
      } catch {
        onError && onError(new Error("Could not load "));
        setStatus("error");
      }
    },
    [mutationFn, onError, onSuccess],
  );

  const reset = () => {
    setStatus("idle");
  };

  return {
    mutate,
    isError: status === "error",
    isLoading: status === "loading",
    isSuccess: status === "success",
    reset,
    status,
  };
};

export default useMutation;
