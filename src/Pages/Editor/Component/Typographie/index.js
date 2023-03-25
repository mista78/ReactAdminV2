import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';
import Portal from '../../../../Components/Portal';
import Reorder from '../../../../Components/Reorder';
import Tiptap from '../../../../Components/Tiptap';
import Remove from '../../../../Components/Remove';
import Details from '../../../../Components/Details';
import Duplicate from '../../../../Components/Duplicate';
import { Spaces } from '../../Helpers';
import styled from 'styled-components';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Lines = styled.div`
    border: 1px solid #000;
`;

import Items from './items';

const Typographie = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, value));
        dispatch({ type: "UPDATE_COMPONENT", components });
    }
    console.log(data?.text);
    const Tag = data[state.devices]?.text && data[state.devices].text !== '' ? data[state.devices].text : 'p';
    return (
        <Fragment>
            <div style={(data[state.devices] ? data[state.devices] : {})} >
                <Tiptap data={data} />
            </div>
        </Fragment>
    );
}

Typographie.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleAddComponent = (e) => {
        const value = e ? e.target.value : 'Line';
        const newBlock = {
            id: uuid(),
            name: value,
            parent: data.id,
            children: []
        }
        const components = state.components.map(item => updatePropertyById(data.id, item, 'children', [...data.children, newBlock]));
        dispatch({ type: "ADD_COMPONENT", components });
        e && (e.target.value = '');
    };

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, value));
        dispatch({ type: "ADD_COMPONENT", components });
    }

    return <Fragment>

        <Details title={`Typographie ${data.id}`} visible={true} onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
        }}>
            {data.tags && data.tags.map((item, index) => {
                return <Items.setting key={index} data={item} />
            })}
        </Details>
        <Portal id="setting">
            <Details title="Setting" id={data.id} open={true}>
                <div>Setting : {data.id}</div>
                <Duplicate data={data} />
                <Reorder data={data} />
                <Remove data={data} />
            </Details>
            <Details title="Spaces" id={data.id} open={true}>
                <Spaces data={data} />
            </Details>
            <Details title="text" id={data.id} open={true}>
                <select onChange={e => {
                    const value = e.target.value;
                    const newItems = {
                        id: uuid(),
                        tagName: value,
                        content: "Default content",
                        parent: data.id,
                    }
                    const components = state.components.map(item => updatePropertyById(data.id, item, 'tags', [...(data.tags ? data.tags : []), newItems]));
                    dispatch({ type: "ADD_COMPONENT", components });
                    e.target.value = '';
                }}>
                    <option value="">Select Tag</option>
                    <option value="p">p</option>
                    {[...new Array(6)].map((item, index) => {
                        const value = 'h' + (index + 1);
                        return <option value={value}>{value}</option>
                    })}
                </select>
            </Details>
        </Portal>

    </Fragment>
}

Typographie.content = ({ data, children }) => {
    const mobile = (data['mobile'] ? data['mobile'] : {});
    const desktop = (data['desktop'] ? data['desktop'] : {});

    const Line = styled.div`
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
        <Tiptap data={data} />
    </Fragment>

}

export default Typographie;