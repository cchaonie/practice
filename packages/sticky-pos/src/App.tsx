import React from "react";
import { useSticky } from "./useSticky";
export default function App() {
  const elRef = useSticky();
  return (
    <div>
      <nav className="navContainer">
        <div className="nav" ref={elRef}>
          <ul>
            <li>item1</li>
            <li>item2</li>
          </ul>
        </div>
      </nav>
      <main className="main">this is main content</main>
    </div>
  );
}
