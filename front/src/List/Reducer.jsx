import { actionType } from "./Events";

const reducerList = () => {

    const action = {};

    action[actionType.CREATED] = (state, action) => {
        const list = state.list.data;
        list.push(action.item);
        return { ...state, list: { data: list } };
    };

    action[actionType.DELETED] = (state, action) => {
        const list = state.list.data.filter((element) => {
            return element.id !== action.listId;
        });
        return { ...state, list: { data: list } }
    };

    action[actionType.FINDED] = (state, action) => {
        return { ...state, list: { data: action.list } }
    };

    return action;

}

export default reducerList;