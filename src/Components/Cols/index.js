import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../store';
import updatePropertyById from '../../Utils/updatePropertyById';
import search from '../../Utils/search';

const Cols = ({ data, keys = "children" }) => {

    const { state, dispatch } = useContext(AppContext);
    const cols = parseInt(data.cols.replace(/fr/g, ''));

    const handleChange = (value) => {
        value = value < 1 ? 1 : value;
        const newCols = `${(value)}fr`;
        const components = state.components.map(item => updatePropertyById(data.id, item, 'cols', newCols));
        console.log(components, newCols);
        dispatch({ type: "ADD_COMPONENT", components });
    };


    return <Fragment>
        <div className="sidebar-edition__body__item">
            <button onClick={e => handleChange(cols + 1)}>Increment Cols</button>
            <button onClick={e => handleChange(cols - 1)}>Decrement Cols</button>
        </div>
    </Fragment>
}

export default Cols;