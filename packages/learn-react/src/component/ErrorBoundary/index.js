import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error) {
        this.setState({ hasError: true, error });
        console.error(error);
    }

    render() {
        const { hasError, error } = this.state;
        if (hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>{JSON.stringify(error)}</p>
                </div>
            );
        }

        return this.props.children;
    }
}
