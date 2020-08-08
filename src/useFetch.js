import { useEffect, useState, useRef } from "react";

export const useFetch = (url) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    return () => {
      // Called when the component is going to umnount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));
    fetch(url)
      .then((x) => x.text())
      .then((y) => {
        setTimeout(() => {
          if (isCurrent.current) {
            setState({ data: y, loading: false });
          }
        }, 0);
      });
  }, [url, setState]);

  return state;
};
