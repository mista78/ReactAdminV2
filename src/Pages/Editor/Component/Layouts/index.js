import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';
import search from '../../../../Utils/search';
import Portal from '../../../../Components/Portal';
import Reorder from '../../../../Components/Reorder';
import Duplicate from '../../../../Components/Duplicate';
import Remove from '../../../../Components/Remove';
import Details from '../../../../Components/Details';
import Cols from '../../../../Components/Cols';
import Test,{ BorderRadius, Spaces, Background, References, EditorSetting } from '../../Helpers';
import styled from 'styled-components';

import AllComponent from '../index';

import HeroBanner from '../HeroBanner';

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
                    style={(data[state.devices] ? data[state.devices] : {})} child={data?.children.map(item => (item.cols))?.join(' ')} >
                    {state.currentSetting == data.id && <EditorSetting data={data} />}
                    {children && children}
                </Lines>
            </References>
        </Fragment>
    );
}

Layouts.setting = ({ data, children, ...props }) => {
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
        console.log("data", data);
        console.log("e.target", e.target);
        console.log("e.target.value", e.target.value);
        const components = state.components.map(item => updatePropertyById(data.id, item, 'children', [...data.children, newBlock]));
        dispatch({ type: "ADD_COMPONENT", components });
        e && (e.target.value = '');
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
            <div>
                <svg width="82" height="99" viewBox="0 0 82 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect onClick={handleAddComponent} value="Hero" width="82" height="74" rx="8" fill="#504F50"/>
                    <rect x="21" y="17" width="40" height="40" rx="3" stroke="white" stroke-width="2"/>
                    <rect x="25" y="48" width="27" height="4" rx="2" fill="#606060"/>
                    <path d="M27.96 93H29.424V89.4H33.516V93H34.98V84.6H33.516V88.2H29.424V84.6H27.96V93ZM39.4814 93.18C41.0174 93.18 42.2054 92.46 42.4334 91.044H41.0534C40.8614 91.752 40.2854 92.088 39.5534 92.088C38.5934 92.088 37.8614 91.488 37.8134 90.324H42.4814C42.5054 90.204 42.5174 90.048 42.5174 89.832C42.5174 87.864 41.2694 86.82 39.5294 86.82C37.7174 86.82 36.4574 88.044 36.4574 90C36.4574 92.088 37.8254 93.18 39.4814 93.18ZM37.8494 89.472C37.9094 88.524 38.5454 87.852 39.4934 87.852C40.4654 87.852 41.0894 88.512 41.0894 89.472H37.8494ZM43.7878 93H45.1918V90.516C45.1918 88.764 45.9358 88.356 46.9918 88.356H47.4718V86.94C47.3278 86.916 47.1718 86.892 46.9798 86.892C45.8518 86.892 45.4438 87.78 45.2158 88.74H45.1558L45.1918 87H43.7878V93ZM51.143 93.18C52.979 93.18 54.239 91.932 54.239 90C54.239 88.068 52.979 86.82 51.143 86.82C49.307 86.82 48.059 88.068 48.059 90C48.059 91.932 49.307 93.18 51.143 93.18ZM49.499 90C49.499 88.656 50.231 87.996 51.143 87.996C52.055 87.996 52.799 88.656 52.799 90C52.799 91.356 52.055 91.992 51.143 91.992C50.231 91.992 49.499 91.356 49.499 90Z" fill="white"/>
                </svg>
            </div>
            <HeroBanner data={data}>Hero</HeroBanner>
        </Details>
        <Portal id="setting">
            {Object.keys(Test).filter(item => !(["EditorSetting", "References"].includes(item))).map((item, index) => {
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

export default Layouts;