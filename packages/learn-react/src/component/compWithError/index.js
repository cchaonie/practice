import React from "react";

export class CompWithError1 extends React.Component {
    componentDidMount() {
        throw new Error("CompWithError1");
    }

    render() {
        return <div>I am CompWithError1</div>;
    }
}

export const CompWithError2 = () => {
    throw new Error("CompWithError2");
    return <div>I am CompWithError2</div>;
};
