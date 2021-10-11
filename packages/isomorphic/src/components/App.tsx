import React, { Suspense, useState } from "react";
import loadable from "@loadable/component";
import styled from "styled-components";
import { Helmet } from 'react-helmet-async';

const OtherComponent = loadable(() => import("./asyncContent/Content"), {
    ssr: false,
});

const Wrapper = styled.div`
    padding: 4em;
    background: papayawhip;
`;

export default function App() {
    const [hidden, setHidden] = useState(false);
    const handleClick = () => setHidden(true);

    return (
        <>
            <Helmet>
                <title data-e2e-id="homePage.title">I am title</title>
            </Helmet>
            <Wrapper>
                <h1>hello ssr and react</h1>
                <div>
                    <button onClick={handleClick}>show hidden content</button>
                    {hidden && <p>"I am hidden"</p>}
                    <OtherComponent />
                </div>
            </Wrapper>
        </>
    );
}
