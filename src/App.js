import React, { useState, useRef, useCallback, useMemo } from "react";
import { useForm } from "./useForm";
import { useMeasure } from "./useMeasure";
import { useFetch } from "./useFetch";
import { Hello } from "./Hello";
import { Hello2 } from "./Hello2";
import { Square } from "./Square";
import { UserReducerComponent } from "./UserReducer";
import { CreateContextContainer } from "./CreateContextContainer";

import "./App.css";

// function computeLongestWord(arr) {
//   if (!arr) {
//     return [];
//   }

//   console.log("computing longest word");

//   let longestWord = "";
//   JSON.parse(arr).forEach((sentence) =>
//     sentence.split(" ").forEach((word) => {
//       if (word.length > longestWord.length) {
//         longestWord = word;
//       }
//     })
//   );
//   return longestWord;
// }

const App = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
    firstName: "",
  });

  const inputRef = useRef();

  const hello = useRef(() => {
    console.log("Awsome");
  });

  const [showHello, setShowHello] = useState(true);

  // when you want to learn about the measurements of a Dom element use useLayoutEffect instead of useEffect();
  // useLayoutEffect(() => {
  //   console.log(inputRef.current.getBoundingClientRect());
  // }, []);

  //custom hook for refs
  const [rect, inputRef2] = useMeasure([]);

  // useEffect(() => {
  //   const onMouseMove = (e) => {
  //     console.log(e);
  //     console.log("mount");
  //   };
  //   window.addEventListener("mousemove", onMouseMove);
  //   return () => {
  //     window.removeEventListener("mousemove", onMouseMove);
  //     console.log("unmount");
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("mount1");
  // });
  // useEffect(() => {
  //   console.log("mount2");
  // });

  //for Hello2
  const [count, setCount] = useState(0);
  const favoriteNums = [7, 21, 37];

  //1. case useCallback if parameters are changed then the function is going to run. You can prevent functions changing the values with callback
  const increment1 = useCallback(() => {
    setCount((c) => c + 1);
  }, [setCount]);
  //2. case
  const increment2 = useCallback(
    (n) => {
      setCount((c) => c + n);
    },
    [setCount]
  );

  // useMemo is great for optimizing computed values

  const [count2, setCount2] = useState(0);
  const { data } = useFetch(
    "https://raw.githubusercontent.com/ajzbc/kanye.rest/quotes/quotes.json"
  );

  //The bast way to use callback is to use it only when you have dependensies
  const computeLongestWord = useCallback((arr) => {
    if (!arr) {
      return [];
    }

    console.log("computing longest word");

    let longestWord = "";
    JSON.parse(arr).forEach((sentence) =>
      sentence.split(" ").forEach((word) => {
        if (word.length > longestWord.length) {
          longestWord = word;
        }
      })
    );
    return longestWord;
  }, []);

  const longestWord = useMemo(() => computeLongestWord(data), [data]);

  return (
    <div className="main-container">
      <div className="container1">
        <h1>Covered UseState, UseEffect, UseRef & UseLayoutEffect</h1>
        <label>Email: </label>
        <input
          ref={inputRef}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        ></input>
        <label>First name: </label>
        <input
          ref={inputRef2}
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        ></input>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        ></input>

        <button
          onClick={() => {
            inputRef.current.focus();
            hello.current();
          }}
        >
          focus
        </button>

        <button onClick={() => setShowHello(!showHello)}>Toggle</button>
        {showHello && <Hello></Hello>}
      </div>

      <div className="container2">
        <h1>Covered useCallback</h1>
        {
          //use callback stops a function to be created in every single render
        }
        <Hello2 increment1={increment1}></Hello2>
        <div>count: {count}</div>
        {favoriteNums.map((n) => {
          return <Square key={n} increment2={increment2} n={n} />;
        })}
      </div>
      <div className="container3">
        <h1>Covered useMemo</h1>
        <div>count: {count2}</div>
        <button
          onClick={() => {
            setCount2(count2 + 1);
          }}
        >
          increment
        </button>
        <div>{longestWord}</div>
      </div>
      <UserReducerComponent className="container4"></UserReducerComponent>
      <CreateContextContainer className="container2"></CreateContextContainer>
    </div>
  );
};

export default App;
