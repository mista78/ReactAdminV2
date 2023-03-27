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
import { BorderRadius ,Spaces, Background } from '../../Helpers';
import styled from 'styled-components';

import AllComponent from '../index';

const Lines = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px dashed pink;
    min-height: 260px;
    @media (min-width: 768px) {
        grid-template-columns: ${props => props.child};
    }
`;

const Line = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, value));
        dispatch({ type: "UPDATE_COMPONENT", components });
    }
    return (
        <Fragment>
            <Lines style={(data[state.devices] ? data[state.devices] : {})} child={data?.children.map(item => (item.cols))?.join(' ')} >
                {children && children}
            </Lines>
        </Fragment>
    );
}

Line.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleAddComponent = (e) => {
        const value = e ? e.target.value : 'Line';
        const newBlock = {
            id: uuid(),
            name: "Layouts",
            parent: data.id,
            cols: '1fr',
            children: []
        }
        const components = state.components.map(item => updatePropertyById(data.id, item, 'children', [...data.children, newBlock]));
        dispatch({ type: "ADD_COMPONENT", components });
        e && (e.target.value = '');
    };

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
            <Details title="Setting" id={data.id} open={true}>
                <div>Setting : {data.id}</div>
                <button onClick={handleAddComponent}>Add Layouts</button>
                <Duplicate data={data} />
                <Reorder data={data} />
                <Remove data={data} />
            </Details>
            <Details title="BorderRadius" id={data.id} open={true}>
                <BorderRadius data={data} />
            </Details>
            <Details title="Spaces" id={data.id} open={true}>
                <Spaces data={data} />
            </Details>

            <Details title="Background" id={data.id} open={true}>
                <Background data={data} />
            </Details>
        </Portal>
        {children && children}
    </Fragment>
}

Line.content = ({ data, children }) => {
    const mobile = (data['mobile'] ? data['mobile'] : {});
    const desktop = (data['desktop'] ? data['desktop'] : {});

    const Line = styled(Lines)`
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
            {data.content ? data.content : 'Default content'}
        </Line>
        {children && children}
    </Fragment>

}

export default Line;