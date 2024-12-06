import { useCallback, useState } from "react";
import { toast } from "sonner";

type ApiFunction<T> = (...args: any[]) => Promise<T>;

const useApi = <T,>(apiFunction: ApiFunction<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args: any) => {
      setLoading(true);
      try {
        const result = await apiFunction(...args);
        setData(result);
        setError(null);
        return result;
      } catch (error: any) {
        console.log(error);

        setError(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message ||
            "Something went wrong!"
        );
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, error, loading, execute };
};

export default useApi;
