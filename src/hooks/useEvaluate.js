import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

function useEvaluate() {
  const [evaluate, setEvaluate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(`http://127.0.0.1:5000/evaluate/${uuid()}`);
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
