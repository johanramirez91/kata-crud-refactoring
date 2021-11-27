import React, { useReducer, createContext } from 'react';
import reducerTodo from './Todo/Reducer';
import reducerList from './List/Reducer';

const initialState = {
    list: {
        data: []
    },
    todo: {
        data: [],
        item: {}
    },
};

const Store = createContext(initialState);
const join = { ...reducerTodo(), ...reducerList() };

function reducerSelect(state, action) {
    return join[action.type] ? join[action.type](state, action) : state;
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerSelect, initialState);
    return <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>
};

export default Store;