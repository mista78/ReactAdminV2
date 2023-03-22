

import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import search from '../../Utils/search';
import updatePropertyById from '../../Utils/updatePropertyById';
import { AppContext } from '../../store';


const Remove = ({ data }) => {

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
        <button onClick={handLeRemove}>Remove</button>
    </Fragment>
}

export default Remove;