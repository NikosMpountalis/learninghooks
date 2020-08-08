import React from "react";
import { useCountRenders } from "./useCountRenders";

//With react memo this components only renders when increment changes, memo generally compares the props... and if the props have changed then is going to rerender the component.

export const Square = React.memo(({ n, increment2 }) => {
  useCountRenders();
  return <button onClick={() => increment2(n)}>Add {n} to count</button>;
});
