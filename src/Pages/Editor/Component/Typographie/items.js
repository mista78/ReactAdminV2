import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import search from '../../../../Utils/search';
import { kebabize, uuid } from '../../../../Utils/tools';
import Portal from '../../../../Components/Portal';
import Reorder from '../../../../Components/Reorder';
import Remove from '../../../../Components/Remove';
import Details from '../../../../Components/Details';
import { Spaces } from '../../Helpers';
import styled from 'styled-components';

import AllComponent from '../index';

const Lines = styled.div`
    border: 1px solid #000;
`;

const updateData = ({data, state, value, dispatch}) => {
    const parent = search([state.components], data.parent);
    const newParent = parent.tags.map(item => updatePropertyById(data.id, item, 'content', value));
    const components = state.components.map(item => updatePropertyById(data.parent, item, 'tags', newParent));
    dispatch({ type: "ADD_COMPONENT", components });
};

const Items = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const Tag = data?.tagName && data.tagName !== '' ? data.tagName : 'p';
    return (
        <Fragment>
            <Tag style={(data[state.devices] ? data[state.devices] : {})} contenteditable="true" onBlur={e => {
                const value = e.target.innerText;
                updateData({data, state, value , dispatch})
            }}>{data.content}</Tag>
        </Fragment>
    );
}


Items.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const parent = search([state.components], data.parent);
        const newParent = parent.tags.map(item => updatePropertyById(data.id, item, state.devices, value));
        const components = state.components.map(item => updatePropertyById(data.parent, item, 'tags', newParent));
        dispatch({ type: "ADD_COMPONENT", components });
    }

    return <Fragment>

        <button onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
        }}>Setting {data.id}</button>
        <Portal id="setting">
            <Details title="Setting" id={data.id} open={true}>
                <div>Setting : {data.id}</div>
                <Reorder data={data} keys="tags" />
                <Remove data={data} />
                <input type="text" value={data.content} onChange={e => {
                    const value = e.target.value;
                    updateData({data, state, value , dispatch})
                }} />

                <input type="color" value={data[state.devices]?.color} onChange={e => {
                    const value = e.target.value;
                    handleUpdateStyle({ color: value })
                }} />
            </Details>
            <Details title="Spaces" id={data.id} open={true}>
                <Spaces data={data} />
            </Details>
        </Portal>
    </Fragment>
}

Items.content = ({ data, children }) => {
    const mobile = (data['mobile'] ? data['mobile'] : {});
    const desktop = (data['desktop'] ? data['desktop'] : {});

    const Line = styled(data?.tagName ? data.tagName : 'p')`
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
        <Line>
            {data.content ? data.content : 'Default content'}
        </Line>
    </Fragment>

}

export default Items;