export default function ({ getState }) {
    return next => {
        // console.log("loggerA", next)
        return action => {
            // console.log("loggerA", action)
            // console.log("loggerA", getState())
            next(action);
        };
    };
};
