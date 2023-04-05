import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';
import search from '../../../../Utils/search';
import Portal from '../../../../Components/Portal';
import Details from '../../../../Components/Details';
import Test, { BorderRadius, Spaces, Background, References, EditorSetting } from '../../Helpers';
import styled from 'styled-components';

import AllComponent from '../index';
const Lines = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px dashed pink;
    position: relative;
    min-height: 260px;
    @media (min-width: 768px) {
        grid-template-columns: ${props => props.child};
    }
    .common {
        position: absolute;
        display: flex;
        top:0;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: .5rem;
        border: 1px solid #ccc;
        button {
            border: none;
            background: transparent;
            cursor: pointer;
        }
    }
    .reorder {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: .5rem;
        border: 1px solid #ccc;
        button {
            border: none;
            background: transparent;
            cursor: pointer;
        }
        left: 0;
    }
`;

const Line = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    console.log("test", Test);

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, value));
        dispatch({ type: "UPDATE_COMPONENT", components });
    }
    const test = {
        padding: "1rem"
    }
    return (
        <Fragment>
            <References data={data}>
                <Lines id={data.id} style={(data[state.devices] ? { ...data[state.devices], ...test } : { ...test })} child={data?.children.map(item => (item.cols))?.join(' ')} >
                    {state.currentSetting == data.id && <EditorSetting data={data} />}
                    {children && children}
                </Lines>
            </References>
        </Fragment>
    );
}

Line.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);



    const upDateUuidRecursively = (data, parent) => {
        const id = uuid();
        const newBlock = {
            ...data,
            id,
            parent,
            children: [...(data.children || []).map(item => upDateUuidRecursively(item, id))]
        }
        return newBlock;
    };
    const handleDuplicate = () => {
        const newBlock = {
            ...upDateUuidRecursively(data, data.parent),
        }
        const parent = data.parent ? search([state.components], data.parent) : state.components;
        const parentComp = data.parent ? parent["children"] : parent
        const currentIndex = parentComp.findIndex(item => item.id === data.id);
        parentComp.splice(currentIndex + 1, 0, newBlock);
        if (data.parent) {
            state.components.map((item, index) => updatePropertyById(data.parent, item, 'children', parentComp));
        } else {
            state.components = parentComp;
        }
        dispatch({ type: "ADD_COMPONENT", components: [...state.components] });
    };

    return <Fragment>
        <Details title={`Line ${data.id}`} visible={true} onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
        }}>
            lorem  ipsum
        </Details>
        <Portal id="setting">
            {Object.keys(Test).filter(item => !(["EditorSetting", "References"].includes(item))).map((item, index) => {
                const Component = Test[item];
                return <Details key={index} title={item} id={data.id} open={true}>
                    <Component data={data} AllComponent={AllComponent} />
                </Details>
            })}
        </Portal>
        <div style={{}}>
            {children && children}
        </div>
    </Fragment>
}

Line.content = ({ data, children }) => {
    const mobile = (data['mobile'] ? data['mobile'] : {});
    const desktop = (data['desktop'] ? data['desktop'] : {});

    const Line = styled(Lines)`
        border: none;
        ${Object.keys(mobile).map((item, index) => {
        return kebabize(item) + ':' + mobile[item] + ';'
    }).join('')}

        @media (min-width: 768px) {
            ${Object.keys(desktop).map((item, index) => {
        return kebabize(item) + ':' + desktop[item] + ';'
    }).join('')}
        }
    `;

    return <Fragment>
        <Line child={data?.children.map(item => (item.cols))?.join(' ')}>
            {children && children}
        </Line>
    </Fragment>

}

Line.icons = ({ handleAddComponent, name }) => {
    return <Fragment>
        <svg  viewBox="0 0 82 74" onClick={e => handleAddComponent(name)} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" rx="8" fill="#504F50" />
            <rect x="9.5" y="18.5" width="63" height="37" rx="3.5" fill="#606060" />
            <rect x="13" y="22" width="56" height="30" rx="4" fill="#B8B8B8" />
            <rect x="9.5" y="18.5" width="63" height="37" rx="3.5" stroke="white" stroke-dasharray="2 2" />
            {/* center text svg */}
            <text x="50%" y="80%" dominant-baseline="hanging" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                {name}
            </text>
        </svg>
    </Fragment>

}

export default Line;