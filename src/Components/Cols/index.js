import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../store';
import updatePropertyById from '../../Utils/updatePropertyById';
import search from '../../Utils/search';

export const Cols = ({ data, keys = "children" }) => {

    const { state, dispatch } = useContext(AppContext);
    const cols = parseInt(data?.cols?.replace(/fr/g, ''));

    const handleChange = (value) => {
        value = value < 1 ? 1 : value;
        const newCols = `${(value)}fr`;
        const components = state.components.map(item => updatePropertyById(data.id, item, 'cols', newCols));
        console.log(components, newCols);
        dispatch({ type: "ADD_COMPONENT", components });
    };


    return <Fragment>
        <div className="sidebar-edition__body__item">
            <button onClick={e => handleChange(cols + 1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.54545 12.2727C6.54545 11.8208 6.95247 11.4545 7.45454 11.4545H16.5455C17.0475 11.4545 17.4545 11.8208 17.4545 12.2727C17.4545 12.7246 17.0475 13.0909 16.5455 13.0909H7.45454C6.95247 13.0909 6.54545 12.7246 6.54545 12.2727Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2727 6.54544C12.7246 6.54544 13.0909 6.95245 13.0909 7.45453L13.0909 16.5454C13.0909 17.0475 12.7246 17.4545 12.2727 17.4545C11.8209 17.4545 11.4545 17.0475 11.4545 16.5454L11.4545 7.45453C11.4545 6.95245 11.8209 6.54544 12.2727 6.54544Z" fill="black"/>
                </svg>
            </button>
            <button onClick={e => handleChange(cols - 1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.54545 12.2727C6.54545 11.8208 6.95247 11.4545 7.45454 11.4545H16.5455C17.0475 11.4545 17.4545 11.8208 17.4545 12.2727C17.4545 12.7246 17.0475 13.0909 16.5455 13.0909H7.45454C6.95247 13.0909 6.54545 12.7246 6.54545 12.2727Z" fill="black"/>
                </svg>
            </button>
        </div>
    </Fragment>
}