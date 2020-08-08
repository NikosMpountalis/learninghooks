import React, { useState, useEffect} from "react";
import { useFetch } from "./useFetch";
import { useMeasure } from "./useMeasure";

export const Hello = () => {
  // React.useEffect(() => {
  //   console.log("mount");
  //   return () => {
  //     console.log("unmount");
  //   };
  // }, []);

  // const renders = useRef(0);
  const [count, setCount] = useState(() =>
    JSON.parse(localStorage.getItem("count"))
  );

  const { data } = useFetch(`http://numbersapi.com/${count}/trivia`);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
    // return localStorage.setItem("count", 0);
  }, [count]);

  // console.log("hello renders:", renders.current++);

  const [rect, divRef] = useMeasure([data]);

  return (
    <div className="container-in">
      <div ref={divRef}>count:{count}</div>
      <div className="data">{!data ? "loading..." : data}</div>
      <pre className="rect">{JSON.stringify(rect, null, 2)}</pre>
      <button onClick={() => setCount((c) => c + 1)}>click me</button>
    </div>
  );
};
