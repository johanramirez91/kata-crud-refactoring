import React, { createContext, useReducer } from "react";
import reducer from "./Reducer";

const initialState = {
    todo: {
        list: [],
        item: {}
    }
}

export const Store = createContext(initialState);

const StoreProviver = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>
}

export default StoreProviver;