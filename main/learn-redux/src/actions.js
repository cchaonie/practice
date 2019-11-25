export const ActionType = {
    ADD: 'add',
    REMOVE: 'remove'
}

export const add = payload => ({
    type: ActionType.ADD,
    payload
})

export const remove = payload => ({
    type: ActionType.REMOVE,
    payload
})