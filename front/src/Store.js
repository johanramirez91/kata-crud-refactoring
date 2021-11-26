import React, { useReducer, createContext } from 'react';
import reducerTodo from './Todo/reducer';

const initialState = {
    list: {
        elements: []
    },
    todo: {
        elements: [],
        item: {}
    },
    mensage: {}
};

const Store = createContext(initialState);
const join = {

}
function reducer(state, action) {
    return join[action.type] ? join[action.type](state, action) : state;
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>
};

export default Store;