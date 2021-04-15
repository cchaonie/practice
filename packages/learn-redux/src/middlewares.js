export function myMiddleware({ getState }) {
    return next => action => {
        const result = next(action);
        console.log('in myMiddleware');
        console.log(getState());
        return result;
    }
}