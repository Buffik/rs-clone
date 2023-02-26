import { useState } from 'react';

const useFetching = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};

export default useFetching;
