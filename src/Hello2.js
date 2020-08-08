import React from "react";
import { useCountRenders } from "./useCountRenders";

//With react memo this components only renders when increment changes, memo generally compares the props... and if the props have changed then is going to rerender the component.

export const Hello2 = React.memo(({ increment1 }) => {
  useCountRenders();
  return <button onClick={increment1}>Add a count</button>;
});
