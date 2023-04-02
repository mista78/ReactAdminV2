import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';

const AddComponent = ({ data, AllComponent, children }) => {
    const { state, dispatch } = useContext(AppContext);
    const handleAddComponent = (e) => {
        const value = e ? e.target.value : 'Line';
        const newBlock = {
            id: uuid(),
            name: value,
            parent: data.id,
            cols: '1fr',
            children: []
        }
        const components = state.components.map(item => updatePropertyById(data.id, item, 'children', [...data.children, newBlock]));
        dispatch({ type: "ADD_COMPONENT", components });
        e && (e.target.value = '');
    };
    return <Fragment>
        <div>Setting : {data.id}</div>
        <select onChange={handleAddComponent}>
            <option value="">Select Component</option>
            {Object.keys(AllComponent).map((item, index) => {
                return <option key={index} value={item}>{item}</option>
            })}
        </select>
    </Fragment>
}

export default AddComponent;