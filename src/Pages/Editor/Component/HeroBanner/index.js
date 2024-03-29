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


const HeroBanner = ({ data, children,Libs, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const [fullName, setFullName] = useState(data.value ? data.value : "heading");
    const [showInputEle, setShowInputEle] = useState(false);

    const handleUpdateValue = (value) => {
        const components = state.components.map(item => updatePropertyById(data.id, item, "value", value));
        dispatch({ type: "ADD_COMPONENT", components });
        console.log("components ", components);
        console.log("data", data);
    }
    
    const handleBlur = (e) => {
        fullName && setShowInputEle(false);
        handleUpdateValue(fullName);
    }

    function ElementMaker(props) {
        return (
            <Fragment>
                {
                    props.showInputEle ? (
                        <input
                        className="heading"
                        type="text"
                        value={props.value}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="heading"
                        autoFocus
                        />
                        ) : (
                            <h2 className="heading" onClick={props.handleClick}>{props.value}</h2>
                            )
                        }
            </Fragment>
        );
    }
    
    return (
        <Fragment>
            <ScriptInject Libs={Libs} name="Slider" />
            <Lines style={(data[state?.devices] ? data[state.devices] : {})}>
                <Hero>
                    <ElementMaker
                        value={fullName}
                        handleChange={(e) => setFullName(e.target.value)}
                        handleClick={() => setShowInputEle(true)}
                        handleBlur={handleBlur}
                        showInputEle={showInputEle}
                    />
                </Hero>
            </Lines>
        </Fragment>
    );
}

HeroBanner.setting = ({ data, children, ...props }) => {
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
                        return <option key={index} value={value}>{value}</option>
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

HeroBanner.content = ({ data,Libs,children }) => {
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
            <ScriptInject.content Libs={Libs} name="Slider" />
            {data.content ? data.content : 'Default content'}
        </Line>
        {children && children}
    </Fragment>

}

HeroBanner.icons = ({ handleAddComponent, name }) => {
    return <Fragment>
        <Svg handleAddComponent={handleAddComponent} name={name}>
            <rect x="21" y="13" width="40" height="40" rx="3" stroke="white" strokeWidth="2" />
            <rect x="25" y="48" width="27" height="4" rx="2" fill="#606060" />
        </Svg>
    </Fragment>
}

export default HeroBanner;