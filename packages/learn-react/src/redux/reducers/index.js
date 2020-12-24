export function reducer(state, action) {
    const { type, payload } = action;
    const { count } = state;
    switch (type) {
        case "INCREASE_SUCCESS":
            return {
                count: count + 1,
            };
        case "DECREASE_SUCCESS":
            return {
                count: count - 1,
            };
        default:
            return state;
    }
}
