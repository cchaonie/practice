import React, { ErrorInfo } from "react";

/**
 * 捕获JS运行时异常
 * @param message
 * @param source
 * @param lineno
 * @param colno
 * @param error
 */
function onErrorHandler(
    message: string,
    source: string,
    lineno: number,
    colno: number,
    error: Error
) {
    console.log(`onErrorHandler:`, { message, source, lineno, colno, error });
    
}

/**
 * 在捕获阶段，捕获JS运行时异常 异步异常（setTimeout） 以及 静态资源加载异常（img）
 * @param error
 */
function errorListener(error: ErrorEvent) {
    console.log(`errorListener:`, error);
}

/**
 * 捕获未catch的Promise rejection
 * @param error
 */
function promiseRejectedHandler(error: ErrorEvent) {
    console.log(`promiseRejectedHandler:`, error);
}

/**
 * React 渲染期间的异常边界
 * @param error
 * @param info
 */
function didCatchHandler(error: Error, info: ErrorInfo) {
    console.log(`didCatchHandler: ${error} ${info}`);
    return true;
}

export const ErrorBoundary = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    return class ComponentWithErrorHandled extends React.Component<P> {
        componentDidMount() {
            window.onerror = onErrorHandler;
            window.addEventListener("error", errorListener, true);
            window.addEventListener(
                "unhandledrejection",
                promiseRejectedHandler
            );
        }

        componentWillUnmount() {
            window.onerror = null;
            window.removeEventListener("error", errorListener, true);
            window.removeEventListener(
                "unhandledrejection",
                promiseRejectedHandler
            );
        }

        componentDidCatch(error: Error, info: ErrorInfo) {
            didCatchHandler(error, info);
        }

        render() {
            return <WrappedComponent {...(this.props as P)} />;
        }
    };
};
