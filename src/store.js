// create store context
import React from 'react';

const storage = {
    get: (key, init) => {
        const value = localStorage.getItem(key);
        if (value) {
            const bool = ["true", "false"];
            if (bool[value] === "true") {
                return true;
            }
            if (bool[value] === "false") {
                return false;
            }

            if(!isNaN(parseInt(value))) {
                return parseInt(value);
            }
            return JSON.parse(value);
        }
        return init;
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));  
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
}


const initialState = {
    components: storage.get("components", []),
    modeEdition: storage.get("modeEdition", false),
    breaksize: storage.get("breaksize", false),
    currentPage: storage.get("currentPage", 0),
    currentSetting: storage.get("currentSetting", null),
    html: storage.get("html", null),
    publish: storage.get("publish", false),
    devices: storage.get("devices", "desktop"),
    urls: null
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

export { AppContext, StateProvider, storage };