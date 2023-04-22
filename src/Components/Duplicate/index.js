import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../store';
import updatePropertyById from '../../Utils/updatePropertyById';
import search from '../../Utils/search';
import { uuid } from '../../Utils/tools';

export const Duplicate = ({ data,keys = "children" }) => {

    const { state, dispatch } = useContext(AppContext);

    const upDateUuidRecursively = (data,parent) => {
        const id = uuid();
        const newBlock = {
            ...data,
            id,
            parent,
            children: [...(data.children || []).map(item => upDateUuidRecursively(item,id))]
        }
        return newBlock;
    };
    const handleDuplicate = () => {
        const newBlock = {
            ...upDateUuidRecursively(data,data.parent),
        }
        const parent = data.parent ? search([state.components], data.parent) : state.components;
        const parentComp = data.parent ? parent[keys] : parent
        const currentIndex = parentComp.findIndex(item => item.id === data.id);
        parentComp.splice(currentIndex + 1, 0, newBlock);
        if (data.parent) {
            state.components.map((item, index) => updatePropertyById(data.parent, item, keys, parentComp));
        } else {
            state.components = parentComp;
        }
        dispatch({ type: "ADD_COMPONENT", components: [...state.components] });
    };


    return <Fragment>
        <div className="sidebar-edition__body__item">
            <button onClick={handleDuplicate}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9091 7.63636H12V9.81818H12.5455C13.4492 9.81818 14.1818 10.5508 14.1818 11.4545V16.3636C14.1818 17.2674 13.4492 18 12.5455 18H7.63636C6.73262 18 6 17.2674 6 16.3636V11.4545C6 10.5508 6.73262 9.81818 7.63636 9.81818H10.3636V7.63636C10.3636 6.73262 11.0963 6 12 6H16.9091C17.8128 6 18.5455 6.73263 18.5455 7.63636V12.5455C18.5455 13.4492 17.8128 14.1818 16.9091 14.1818H14.1818V12.5455L16.9091 12.5455V7.63636ZM7.63636 11.4545H12.5455L12.5455 16.3636H7.63636L7.63636 11.4545Z" fill="black"/>
                </svg>
            </button>
        </div>
    </Fragment>
}