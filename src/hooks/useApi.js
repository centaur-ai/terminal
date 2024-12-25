import { useState } from "react";

function useApi() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleResponse = async (promise, callback) => {
    setLoading(true);
    setError(null);
    try {
      const response = await promise;
      if (callback) {
        callback(response);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleResponse };
}

export default useApi;
