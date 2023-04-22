import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';
import search from '../../../../Utils/search';
import {Portal, Details} from '../../../../Components';
import Test, { BorderRadius, Spaces, Background, References, EditorSetting } from '../../Helpers';
import Svg from '../../Helpers/Svg';
import styled from 'styled-components';

import AllComponent from '../index';

const Lines = styled.div`
    position: relative;
    border: 1px dashed blue;
    .pop {
        display: flex;
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

const SidebarLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
`;

const Layouts = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, value));
        dispatch({ type: "UPDATE_COMPONENT", components });
    }
    return (
        <Fragment>
            <References data={data}>
                <Lines
                    id={data.id}
                    onClick={e => {
                        dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
                    }}
                    style={(data[state?.devices] ? data[state.devices] : {})} child={data?.children.map(item => (item.cols))?.join(' ')} >
                    {state?.currentSetting == data.id && <EditorSetting data={data} />}
                    {children && children}
                </Lines>
            </References>
        </Fragment>
    );
}

Layouts.setting = ({ data, children, ...props }) => {
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

    return <Fragment>
        <Details title={`Layouts ${data.id}`} visible={true} onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
        }}>
            lorem  ipsum
            <SidebarLayout>
                <svg viewBox="0 0 82 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" onClick={(e) => handleAddComponent("HeroBanner")} rx="8" fill="#504F50" />
                    <rect x="21" y="13" width="40" height="40" rx="3" stroke="white" strokeWidth="2" />
                    <rect x="25" y="48" width="27" height="4" rx="2" fill="#606060" />
                    {/* text svg bottom */}
                    <text x="50%" y="80%" dominantBaseline="hanging" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        HeroBanner
                    </text>
                </svg>
                <svg onClick={(e) => handleAddComponent("Introduction")} viewBox="0 0 82 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="82" height="74" rx="8" fill="#504F50"/>
                    <rect x="16" y="21.5" width="50" height="3" rx="1.5" fill="#606060"/>
                    <rect x="16" y="28.5" width="50" height="3" rx="1.5" fill="#606060"/>
                    <rect x="16" y="35.5" width="50" height="3" rx="1.5" fill="#606060"/>
                    <rect x="16" y="42.5" width="23" height="3" rx="1.5" fill="#606060"/>
                    <rect x="16" y="49.5" width="23" height="3" rx="1.5" fill="#606060"/>
                    <rect x="43" y="42.5" width="23" height="3" rx="1.5" fill="#606060"/>
                    <rect x="43" y="49.5" width="23" height="3" rx="1.5" fill="#606060"/>
                    <text x="50%" y="80%" dominantBaseline="hanging" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        Introduction
                    </text>        
                </svg>
            </SidebarLayout>
        </Details>
        <Portal id="setting">
            {Object.keys(Test).filter(item => !(["EditorSetting", "References", "ScriptInject"].includes(item))).map((item, index) => {
                const Component = Test[item];
                return <Details key={index} title={item} id={data.id} open={true}>
                    <Component data={data} AllComponent={AllComponent} />
                </Details>
            })}
        </Portal>
        {children && children}
    </Fragment>
}

Layouts.content = ({ data, children }) => {
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
        <Line >
            {children && children}
        </Line>
    </Fragment>

}

Layouts.icons = ({ handleAddComponent, name }) => {
    return <Fragment>
        <Svg handleAddComponent={handleAddComponent} name={name}>
            <rect x="6.5" y="18.5" width="29" height="31" rx="7.5" fill="#939393" stroke="#CECECE" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6" />
            <rect x="44.5" y="18.5" width="29" height="31" rx="7.5" fill="#939393" stroke="#CECECE" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6" />
        </Svg>
    </Fragment>

}

export default Layouts;