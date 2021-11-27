export const actionType = {
    CREATED: "item.CREATED",
    UPDATED: "item.UPDATED",
    DELETED: "item.DELETED",
    EDITED: "item.EDITED",
    FINDED: "item.FINDED",
}

const events = {
    saved: (listId, item) => ({ type: actionType.CREATED, item, listId }),
    deleted: (listId, itemId) => ({ type: actionType.DELETED, itemId, listId }),
    updated: (listId, item) => ({ type: actionType.UPDATED, item, listId }),
    onEdited: (listId, item) => ({ type: actionType.EDITED, item, listId }),
    finded: (listId, items) => ({ type: actionType.FINDED, items, listId })
}

export default events;