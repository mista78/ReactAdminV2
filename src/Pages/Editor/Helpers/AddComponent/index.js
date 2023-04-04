import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';

import styled from 'styled-components';

const Lines = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    div {
        display: grid;
    }
`;



const AddComponent = ({ data, AllComponent, children }) => {
    const { state, dispatch } = useContext(AppContext);
    const handleAddComponent = (value) => {
        const newBlock = {
            id: uuid(),
            name: value,
            parent: data.id,
            cols: '1fr',
            children: []
        }
        const components = state.components.map(item => updatePropertyById(data.id, item, 'children', [...data.children, newBlock]));
        dispatch({ type: "ADD_COMPONENT", components });
    };
    return <Fragment>
        <div>Setting : {data.id}</div>
        <Lines>
            {Object.keys(AllComponent).map((item, index) => {
                return <div key={index} onClick={e => handleAddComponent(item)}>{item}</div>
            })}
        </Lines>
    </Fragment>
}

export default AddComponent;