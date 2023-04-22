import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize } from '../../../../Utils/tools';
import {Portal, Details, Remove, Reorder, MediaUploader} from '../../../../Components';
import { Spaces, ScriptInject } from '../../Helpers';
import styled from 'styled-components';
import Svg from '../../Helpers/Svg';

const Lines = styled.div`
    border: 1px solid #000;
`;

const Hero = styled.div`
    position: relative;
    height: 100vh;
    .heading {
        position: absolute;
        left: 1rem;
        bottom: 1rem;
        font-size: 2.5rem;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
    }
    input {
        background-color: #2F2F30;
    }
`;


const HomePage = ({ data, children, Libs, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <Fragment>
            <Lines style={(data[state.devices] ? data[state.devices] : {})}>
                <Hero>
                lorem ipsum
                </Hero>
            </Lines>
            <ScriptInject Libs={Libs} name="test" />
        </Fragment>
    );
}

HomePage.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);
    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, value));
        dispatch({ type: "ADD_COMPONENT", components });
    }
    return <Fragment>
        <button onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
        }}>Setting {data.id}</button>
        <Portal id="setting">
            <Details title="Setting" id={data.id} open={true}>
                <div>Setting : {data.id}</div>
                <select onChange={e => {
                    const value = e.target.value;
                    if (value === "") {
                        delete data[state.devices]['height'];
                        handleUpdateStyle();
                    } else {
                        handleUpdateStyle({ 'height': e.target.value });
                    };
                }}>
                    <option value="">Ratio Page</option>
                    {[...new Array(4)].map((item, index) => {
                        const ratio = (index + 1) * 0.25;
                        const value = ratio * 100 + 'vh';
                        return <option value={value}>{value}</option>
                    })}
                </select>
                <MediaUploader data={data} />
                <Reorder data={data} />
                <Remove data={data} />
            </Details>
            <Details title="Spaces" id={data.id} open={true}>
                <Spaces data={data} />
            </Details>
        </Portal>
    </Fragment>
}

HomePage.content = ({ data, Libs, children }) => {
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
        <Line >
            {data.content ? data.content : 'Default content'}
        </Line>
        {children && children}
        <ScriptInject.content Libs={Libs} name="Slider" />
    </Fragment>

}

HomePage.icons = ({ handleAddComponent, name }) => {
    return <Fragment>
        <Svg handleAddComponent={handleAddComponent} name={name}>
            <svg width="82" height="54" viewBox="0 0 82 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="82" height="54" rx="8" fill="#504F50" />
                <rect x="8" y="9" width="66" height="56" rx="4" fill="#B8B8B8" />
                <rect x="29" y="34" width="5" height="18" rx="2" transform="rotate(90 29 34)" fill="#606060" />
                <rect x="50" y="34" width="5" height="18" rx="2" transform="rotate(90 50 34)" fill="#606060" />
                <rect x="72" y="34" width="5" height="18" rx="2" transform="rotate(90 72 34)" fill="#606060" />
            </svg>
        </Svg>
    </Fragment>
}

export default HomePage;