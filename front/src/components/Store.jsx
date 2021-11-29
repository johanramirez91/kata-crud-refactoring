import React, { useReducer, createContext } from 'react';
import { reducer } from './Reducer'

const initialState = {
    todo: { list: [], item: {} },
    categoryList: { list: [], item: {} }
};

export const Store = createContext(initialState);

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>;

};