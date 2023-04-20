import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';
import {Portal, Tiptap, Details} from '../../../../Components';
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

Typographie.icons = ({ handleAddComponent, name }) => {
    return <Fragment>
        <svg  viewBox="0 0 82 74" onClick={e => handleAddComponent(name)} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect  width="100%" height="100%" rx="8" fill="#504F50" />

            <path d="M25.0891 46.8978C26.0482 46.8978 26.5349 46.4891 26.8499 45.4672L28.4533 40.9124H36.6276L38.2166 45.4672C38.5316 46.4891 39.0326 46.8978 39.9775 46.8978C40.9796 46.8978 41.6238 46.2847 41.6238 45.3212C41.6238 44.9708 41.5665 44.6788 41.4377 44.2847L35.0958 26.8248C34.652 25.5985 33.8503 25 32.5476 25C31.3021 25 30.4861 25.5985 30.0709 26.8102L23.6861 44.3577C23.5573 44.7372 23.5 45.0438 23.5 45.3504C23.5 46.3139 24.1013 46.8978 25.0891 46.8978ZM29.2693 38.2117L32.5046 28.7226H32.5905L35.8259 38.2117H29.2693ZM49.4688 46.9854C51.6305 46.9854 53.6777 45.8029 54.5653 43.9343H54.6225V45.5839C54.6368 46.4599 55.2238 47 56.0541 47C56.9131 47 57.5 46.4453 57.5 45.4672V35.8321C57.5 32.6058 55.0949 30.5182 51.3013 30.5182C48.3952 30.5182 46.076 31.7299 45.26 33.6569C45.1025 34.0073 45.0166 34.3431 45.0166 34.6642C45.0166 35.4088 45.5463 35.9051 46.3051 35.9051C46.8347 35.9051 47.2356 35.7007 47.5219 35.2482C48.3665 33.6569 49.4832 32.9416 51.2011 32.9416C53.2768 32.9416 54.5366 34.1241 54.5366 36.0511V37.2482L50.0701 37.5109C46.3051 37.7153 44.2293 39.438 44.2293 42.2409C44.2293 45.073 46.3909 46.9854 49.4688 46.9854ZM50.2705 44.6496C48.4667 44.6496 47.2356 43.6423 47.2356 42.1241C47.2356 40.6642 48.3808 39.7007 50.4709 39.5693L54.5366 39.292V40.7664C54.5366 42.9562 52.6469 44.6496 50.2705 44.6496Z" fill="white" />

            {/* center text svg */}
            <text x="50%" y="80%" dominant-baseline="hanging" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                {name}
            </text>
        </svg>
    </Fragment>

}

export default Typographie;