import { useCallback, useEffect, useState } from "react";

import http from "../http/index";
import useApi from "./useApi";
import { v4 as uuid } from "uuid";

function useEvaluate() {
  const [evaluate, setEvaluate] = useState([]);
  const [message, setMessage] = useState({
    content: "",
    pwl: false,
  });
  const [file, setFile] = useState({
    id: "",
    file: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleResponse } = useApi();

  useEffect(() => {
    const eventSource = new EventSource(
      `http://127.0.0.1:5000/evaluate/${uuid()}`
    );
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

  const postMessage = useCallback((content, pwl) => {
    const payload = { content };
    if (pwl) {
      payload.pwl = pwl;
    }

    handleResponse(http.post(`/evaluate`, payload), (response) => {
      setMessage(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  const postFile = useCallback(async (file, id, description) => {
    const payload = { file, id, description };
    try {
      const response = await http.post(`/evaluate`, payload);
      const result = await handleResponse(response, (res) => {
        if (res && res.data) {
          setFile(res.data);
        }
      });
      return result.data;
    } catch (error) {
      console.error("Error posting file:", error);
      throw error;
    }
  }, []);

  return {
    loading,
    error,
    evaluate,
    postMessage,
    message,
    postFile,
    file,
  };
}

export default useEvaluate;
