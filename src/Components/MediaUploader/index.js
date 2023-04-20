import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../store';
import updatePropertyById from '../../Utils/updatePropertyById';
import search from '../../Utils/search';


export const MediaUploader = ({ data, url }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleChangeOrder = (value) => {
        const res = value ? `url('${value}')` : 'none';
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, { ...(data[state.devices] ? data[state.devices] : {}), backgroundImage: res }));
        dispatch({ type: "ADD_COMPONENT", components: [...components] });
    }

    return <Fragment>
        <div className="sidebar-edition__body__item">
            {(data[state.devices]?.backgroundImage && data[state.devices]?.backgroundImage !== "none") && <button onClick={() => {
                handleChangeOrder(null);
            }}> Reset Image </button>}

            <input type="file" onChange={(e) => {
                const { files } = e.target;
                const [file] = files;
                const reader = new FileReader();
                reader.onload = (e) => {
                    const { result } = e.target;
                    handleChangeOrder(result);
                };
                reader.readAsDataURL(file);
            }} />
        </div>
    </Fragment>
}