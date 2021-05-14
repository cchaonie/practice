import React, { useState } from "react";

export default function App() {
    const [hidden, setHidden] = useState(false);
    const handleClick = () => setHidden(true);
    return (
        <div>
            <h1>hello ssr and react</h1>
            <div>
                <button onClick={handleClick}>show hidden content</button>
                {hidden && <p>"I am hidden"</p>}
            </div>
        </div>
    );
}
