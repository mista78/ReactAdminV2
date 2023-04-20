import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import search from '../../Utils/search';
import updatePropertyById from '../../Utils/updatePropertyById';
import { AppContext } from '../../store';

export const Remove = ({ data }) => {

    const { state, dispatch } = useContext(AppContext);

    const handLeRemove = () => {
        const parent = data.parent ? search([state.components], data.parent) : state.components;
        const parentComp = data.parent ? parent?.children : parent;
        const findIndex = parentComp.findIndex(item => item.id === data.id);
        parentComp.splice(findIndex, 1);
        const newParent = parentComp;
        const components = state.components.map(item => updatePropertyById(data.id, item, (data.parent ? 'children' : null), newParent));
        dispatch({ type: "ADD_COMPONENT", components });
    }


    return <Fragment>
        <button onClick={handLeRemove}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6051 6.73984H16.8074L16.8069 6.73956C17.1955 6.73956 17.4545 6.99678 17.4545 7.38234V8.66734C17.4545 9.05289 17.1955 9.30984 16.8069 9.30984C16.4182 9.30984 16.1592 9.05289 16.1592 8.66734V8.02484H14.2159C13.9569 8.02484 13.7625 7.89623 13.6329 7.63928L13.1796 6.73956H11.3659L10.9125 7.63928C10.7829 7.89623 10.5886 8.02484 10.3296 8.02484H8.38625V8.66761C8.38625 9.05317 8.12724 9.31011 7.73858 9.31011C7.34992 9.31011 7.0909 9.05317 7.0909 8.66761V7.38234C7.0909 6.99678 7.3502 6.73956 7.73886 6.73956H9.94145L10.3948 5.84011C10.5242 5.58289 10.7185 5.45456 10.9778 5.45456H13.5688C13.8278 5.45456 14.0221 5.58317 14.1518 5.84011L14.6051 6.73984ZM8.25717 9.9529H16.2891C16.6128 10.0171 16.8071 10.3385 16.8071 10.6598L16.1595 17.7285C16.0948 18.0498 15.8358 18.3068 15.5118 18.3068H9.03422C8.71052 18.3068 8.38654 18.0498 8.38654 17.7285L7.73887 10.6598C7.73887 10.3385 7.9332 10.0171 8.25717 9.9529ZM9.0989 11.2382L9.61721 17.0215H14.9288L15.4471 11.2382H9.0989Z" fill="black"/>
            </svg>
        </button>
    </Fragment>
}