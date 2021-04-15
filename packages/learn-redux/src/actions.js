export const ActionType = {
    ADD: 'add',
    REMOVE: 'remove',
    ADD_ASYNC: 'add_async'
}

export const addAsync = payload => ({
    type: ActionType.ADD_ASYNC,
    payload
})

export const add = payload => ({
    type: ActionType.ADD,
    payload
})

export const remove = payload => ({
    type: ActionType.REMOVE,
    payload
})