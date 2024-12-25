import { useCallback, useEffect, useState } from "react";

import config from "../../config";
import http from "../http/index";
import useApi from "./useApi";

function useEvaluate() {
  const [evaluate, setEvaluate] = useState([]);
  const [message, setMessage] = useState({
    id: "",
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

  const establishEventSource = useCallback(() => {
    const eventSource = new EventSource(`${config.api}/evaluate`);

    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setEvaluate((prevEvaluate) => [newData, ...prevEvaluate]);
        if (newData.content) {
          setMessage((prevMessage) => ({
            ...prevMessage,
            content: newData.content,
          }));
        }
        if (newData.desc) {
          setFile((prevFile) => ({
            ...prevFile,
            description: newData.desc,
          }));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error parsing event data:", error);
        setError(error);
        setLoading(false);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      setError(err);
      setLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const postMessage = useCallback(async (content, pwl) => {
    const payload = { content, pwl };
    try {
      const response = await http.post(`/evaluate`, payload);
      const result = await handleResponse(response, (res) => {
        if (res && res.data) {
          setMessage(res.data);
        }
      });
      return result.data;
    } catch (error) {
      console.error("Error posting message:", error);
      throw error;
    }
  }, []);

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

  useEffect(() => {
    if (window.location.pathname === "/") return;
    const cleanup = establishEventSource();
    return cleanup;
  }, [establishEventSource]);

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
