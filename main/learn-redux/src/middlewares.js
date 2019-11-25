export function myMiddleware({ getState }) {
    return next => action => {
        console.log('in myMiddleware');
        console.log(getState());
        return next(action);
    }
}