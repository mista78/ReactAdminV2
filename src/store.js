// create store context
import React from 'react';


const initialState = {
    components: [],
    modeEdition: true,
    breaksize: null,
    currentPage: 1,
    currentSetting: null,
    html: null,
    publish: null,
    devices: "desktop"
};

const AppContext = React.createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "UPDATE_MOBILE":
                return { ...state, ...action };
            case "ADD_COMPONENT":
                return { ...state, ...action };
            case "REMOVE_COMPONENT":
                return { ...state, ...action };
            case "MODE_EDITION":
                return { ...state, ...action };
            case "MODE_BREAKSIZE":
                return { ...state, ...action };
            case "CURRENT_PAGE":
                return { ...state, ...action };
            case "CURRENT_SETTING":
                return { ...state, ...action };
            case "SET_HTML":
                return { ...state, ...action };

            case "publish":
                return { ...state, ...action };
            case "DEVICES":
                return { ...state, ...action };
            default:
                return state;
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AppContext, StateProvider };