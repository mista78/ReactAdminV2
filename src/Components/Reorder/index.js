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
        <div className="sidebar-edition__body__item">
            <label>Change Order</label>
            <button onClick={() => handleChangeOrder(data.id, "up", { data })}>{top}</button>
            <button onClick={() => handleChangeOrder(data.id, "down", { data })}>{down}</button>
        </div>
    </Fragment>
}

export default Reorder;