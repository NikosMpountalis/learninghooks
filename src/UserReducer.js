import React, { useReducer, useState } from "react";

// 1. A SIMPLE CASE TO USE REDUCER
//state is the current value in the state 
// an action is a function that is going to store the new state here
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 2. case with todos
function reducer2(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
        todoCount: state.todoCount + 1,
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed } : t
        ),
        todoCount: state.todoCount,
      };
    default:
      return state;
  }
}

export const UserReducerComponent = ({ className }) => {
  // current value for count is 0 and also is the current value for the state in the reducer
  const [count, dispatch] = useReducer(reducer, 0);
  const [{ todos, todoCount }, disState] = useReducer(reducer2, {
    todos: [],
    todoCount: 0,
  });
  const [text, setText] = useState();

  return (
    <div className={className}>
      <div style={flex}>
        <h1>Covered useReducer</h1>
        <div>count: {count}</div>
        <button onClick={() => dispatch({ type: "INCREMENT", action: "" })}>
          +
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT", action: "" })}>
          -
        </button>
      </div>
      <div>
        <form
          style={flex}
          onSubmit={(e) => {
            e.preventDefault();
            disState({ type: "add-todo", text });
            setText("");
          }}
        >
          <label>Just Type:</label>
          <input value={text} onChange={(e) => setText(e.target.value)}></input>
        </form>
        <div>Number of todos: {todoCount}</div>
        {todos.map((t, idx) => (
          <div
            key={t.text}
            onClick={() => disState({ type: "toggle-todo", idx })}
            style={{ textDecoration: t.completed ? "line-through" : "" }}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const flex = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "10px 0 20px 0",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};
