import { useCallback, useEffect, useState } from "react";
import config from "../../config";
import http from "../http/index";
import useApi from "./useApi";
import { useParams } from "react-router-dom";

function useEvaluate() {
  const { id } = useParams();
  const [evaluate, setEvaluate] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bestTheory, setBestTheory] = useState(null);
  const { handleResponse } = useApi();
  const [reasoning, setReasoning] = useState(false);

  const establishEventSource = useCallback(() => {
    const eventSource = new EventSource(`${config.api}/evaluate/${id}`);
    setReasoning(true);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if(data.type === "system" && data.event === "stream_start") {
          setDescription(data.description);
        } else if(data.type==="best_theory" ) {
          console.log("Best theory:", data.axiom);
          setBestTheory(data.axiom);
        } else {
          setEvaluate((prevEvaluate) => [data, ...prevEvaluate]);
        }
      } catch (error) {
        console.error("Error parsing event data:", error);
        setError(error);
        setLoading(false);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      setError(err);
      setReasoning(false);
      setLoading(false);
      eventSource.close();
    };

    return () => {
      setReasoning(false);
      eventSource.close();
    };
  }, []);

  const postMessage = useCallback(async (content, pwl) => {
    if (!pwl) {
      alert(
        "DELPH-IN integration still in development, please enable PWL mode");
      return;
    }

    const payload = { description: content, pwl };
    try {
      const response = await http.post(`/evaluate`, payload);
      const result = await handleResponse(response, (res) => {
        setDescription(res.data.description);
      });
      return result.data;
    } catch (error) {
      console.error("Error posting message:", error);
      throw error;
    }
  }, []);

  const postFile = useCallback(async (payload) => {
    try {
      const response = await http.post(`/evaluate`, payload);
      const result = await handleResponse(response, (res) => {
        setDescription(res.data.description);
      });
      return result.data;
    } catch (error) {
      console.error("Error posting file:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/") return;
    return establishEventSource();
  }, [establishEventSource]);

  return {
    loading,
    error,
    evaluate,
    postMessage,
    postFile,
    description,
    bestTheory,
    reasoning,
  };
}

export default useEvaluate;
