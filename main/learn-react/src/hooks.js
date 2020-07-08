import { useState } from "react";
export function useCount() {
  const [count, setCount] = useState(0);
  const inc = () => setCount((count) => count + 1);
  const desc = () => setCount((count) => count - 1);
  return [count, inc, desc];
}

export function countLogic() {
  let count = 0;
  return {
    get count() {
      return count;
    },
    inc: () => count++,
    desc: () => count--,
  };
}
