import { actionType } from "./Events";
import events from "./Events";

const reducerTodo = () => {

    const action = {}

    action[actionType.FINDED] = (state, action) => {
        const list = state.todo.elements;
        action.items.forEach(element => {
            list.push(element);
        })
        return { ...state, todo: { elements: list, item: {} } }
    }

    action[actionType.CREATED] = (state, action) => {
        const list = state.todo.elements;
        list.push(action.item);
        return { ...state, todo: { elements: list, item: {} } }
    };

    action[actionType.EDITED] = (state, action) => {
        const editToDo = { ...state.todo };
        editToDo.item[action.listId] = action.item;
        return { ...state, todo: editToDo }
    };

    action[actionType.UPDATED] = (state, action) => {
        const list = state.todo.elements.map((element) => {
            if (element.id === action.item.id) {
                return { ...action.item, listId: action.listId };
            }
            return element;
        });
        return { ...state, todo: { elements: list, item: {} } }
    };

    action[actionType.DELETED] = (state, action) => {
        const list = state.todo.elements.filter((element) => {
            return element.id !== action.itemId;
        });
        return { ...state, todo: { elements: list, item: {} } }
    };

    return action;

}

export default reducerTodo;