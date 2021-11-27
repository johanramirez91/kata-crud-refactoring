export const actionType = {
    CREATED: "item.CREATED",
    DELETED: "item.DELETED",
    FINDED: "item.FINDED",
}

const events = {
    saved: (listId, item) => ({ type: actionType.CREATED, item, listId }),
    deleted: (listId, itemId) => ({ type: actionType.DELETED, itemId, listId }),
    finded: (listId, items) => ({ type: actionType.FINDED, items, listId })
}

export default events;