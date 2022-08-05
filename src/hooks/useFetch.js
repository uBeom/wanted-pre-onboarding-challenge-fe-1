import { useEffect, useState } from "react";
import { URL } from "../constants/url";

const fetchTodos = async (path, init, setState) => {
  try {
    const res = await fetch(`${URL}${path}`, init);
    const { data } = await res.json();

    setState((prev) => ({ ...prev, data }));
  } catch (error) {
    setState((prev) => ({ ...prev, isError: true }));
  } finally {
    setState((prev) => ({ ...prev, isLoading: false }));
  }
};

export const useFetch = (path, init) => {
  const [state, setState] = useState({
    isLoading: true,
    isError: false,
    data: null,
  });
  const [trigger, setTrigger] = useState(false);

  const refetch = () => setTrigger((prev) => !prev);

  useEffect(() => {
    fetchTodos(path, init, setState);
  }, [trigger]);

  return { ...state, refetch };
};
