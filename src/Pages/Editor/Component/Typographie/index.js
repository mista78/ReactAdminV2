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
import styled from 'styled-components';
import Test, { BorderRadius, Spaces, Background, References, EditorSetting } from '../../Helpers';


const Lines = styled.div`
    position: relative;
`;


const Typographie = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);
    return (
        <Fragment>
            <References data={data}>
                <Lines
                    onClick={e => {
                        dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
                    }} style={(data[state.devices] ? data[state.devices] : {})} >
                    {state.currentSetting == data.id && <EditorSetting data={data} />}
                    <Tiptap data={data} />
                </Lines>
            </References>
        </Fragment>
    );
}

Typographie.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);
    return <Fragment>

        <Details title={`Typographie ${data.id}`} visible={true} onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
        }}>
        </Details>
        <Portal id="setting">
            <Details title="Spaces" id={data.id} open={true}>
                <Spaces data={data} />
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
        <Line className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
    </Fragment>

}

export default Typographie;