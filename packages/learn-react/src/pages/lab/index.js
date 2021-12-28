import React from "react";
import ErrorBoundary from "../../component/ErrorBoundary";
import { CompWithError1, CompWithError2 } from "../../component/compWithError";

const Lab = () => {
    return (
        <div>
            <ErrorBoundary>
                <h1>Lab Page</h1>
                {[1, 2].map(v => {
                    throw new Error("error happen");
                    return <div>{v}</div>;
                })}
                <CompWithError1 />
            </ErrorBoundary>
        </div>
    );
};

export default Lab;

// return React.createElement(
//     "div",
//     null,
//     React.createElement(
//         ErrorBoundary,
//         null,
//         React.createElement("h1", null, "Lab Page"),
//         [1, 2].map(v => {
//             throw new Error("error happen");
//             return React.createElement("div", null, v);
//         }),
//         React.createElement(CompWithError2, null)
//     )
// );
