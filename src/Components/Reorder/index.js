import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../store';
import updatePropertyById from '../../Utils/updatePropertyById';
import search from '../../Utils/search';

const Reorder = ({ data, top = "Up", down = "Down", keys = "children" }) => {

    const { state, dispatch } = useContext(AppContext);

    const handleChangeOrder = (id, direction) => {
        const parent = data.parent ? search([state.components], data.parent) : state.components;
        const parentComp = data.parent ? parent[keys] : parent
        const currentIndex = parentComp.findIndex(item => item.id === data.id);
        const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= parentComp.length) return;
        parentComp.splice(currentIndex, 1, parentComp.splice(newIndex, 1, parentComp[currentIndex])[0]);
        if (data.parent) {
            state.components.map((item, index) => updatePropertyById(data.parent, item, keys, parentComp));
        } else {
            state.components = parentComp;
        }
        dispatch({ type: "ADD_COMPONENT", components: [...state.components] });
    };


    return <Fragment>
        <div className="sidebar-edition__body__item reorder">
            <button onClick={() => handleChangeOrder(data.id, "up", { data })}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.60028 12.4906C6.17425 12.9167 6.17425 13.6074 6.60028 14.0334C7.0263 14.4594 7.71703 14.4594 8.14305 14.0334L12 10.1765L15.8569 14.0334C16.283 14.4594 16.9737 14.4594 17.3997 14.0334C17.8257 13.6074 17.8257 12.9167 17.3997 12.4906L12.7714 7.8623C12.7181 7.80905 12.6607 7.76245 12.6003 7.72251C12.1768 7.44293 11.6014 7.48953 11.2286 7.8623M6.60028 12.4906L11.2276 7.86333L6.60028 12.4906Z" fill="black"/>
                </svg>
            </button>
            <button onClick={() => handleChangeOrder(data.id, "down", { data })}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3997 11.6805C17.8257 11.2544 17.8257 10.5637 17.3997 10.1377C16.9737 9.71167 16.283 9.71167 15.8569 10.1377L12 13.9946L8.14305 10.1377C7.71703 9.71167 7.0263 9.71167 6.60028 10.1377C6.17425 10.5637 6.17425 11.2544 6.60028 11.6805L11.2286 16.3088C11.6546 16.7348 12.3454 16.7348 12.7714 16.3088M17.3997 11.6805L12.7724 16.3078L17.3997 11.6805Z" fill="black"/>
                </svg>
            </button>
        </div>
    </Fragment>
}

export default Reorder;