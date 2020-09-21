import { ActionType } from './actions';

export function reducer(state, action) {
    const { count } = state
    switch (action.type) {
        case ActionType.ADD: return { count: count + action.payload }
        case ActionType.REMOVE: return { count: count - action.payload }
        default: return state
    }
}

export const initialState = {
    count: 0
}