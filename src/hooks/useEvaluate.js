import { useEffect, useState } from "react";

function useEvaluate() {
  const [evaluate, setEvaluate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/evaluate");

    eventSource.onmessage = function (event) {
      const newData = JSON.parse(event.data);
      setEvaluate((prevEvaluate) => [newData, ...prevEvaluate]);
      setLoading(false);
    };

    eventSource.onerror = function (err) {
      console.error("EventSource error: ", err);
      setError(err);
      setLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return {
    loading,
    error,
    evaluate,
  };
}

export default useEvaluate;
