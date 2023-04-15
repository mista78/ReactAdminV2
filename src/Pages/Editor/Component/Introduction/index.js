import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize } from '../../../../Utils/tools';
import Portal from '../../../../Components/Portal';
import Reorder from '../../../../Components/Reorder';
import Remove from '../../../../Components/Remove';
import Details from '../../../../Components/Details';
import MediaUploader from '../../../../Components/MediaUploader';
import { Spaces, ScriptInject } from '../../Helpers';
import styled from 'styled-components';

const Lines = styled.div`
    border: 1px solid #000;
`;

const Intro = styled.div`

`;

const Introduction = ({ data, children,Libs, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const [fullName, setFullName] = useState(data.value);
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
    
    return (
        <Fragment>
            <ScriptInject Libs={Libs} name="Slider" />
            <Lines style={(data[state.devices] ? data[state.devices] : {})}>
               <Intro>
                    <p>Péparer la migration d’INTERSPORT sur Figma grâce à la création d’un design system et de templates.</p>
                    <div>
                        <ul>
                            <li>services</li>
                            <li>ui design</li>
                            <li>services</li>
                        </ul>
                        <ul>
                            <li>Date</li>
                            <li>ui design</li>
                        </ul>
                        <ul>
                            <li>ui design</li>
                            <li>ui design</li>
                        </ul>
                    </div>
               </Intro>
            </Lines>
        </Fragment>
    );
}

Introduction.setting = ({ data, children, ...props }) => {
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

Introduction.content = ({ data,Libs,children }) => {
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

Introduction.icons = ({ handleAddComponent, name }) => {
    return <Fragment>
        <svg onClick={(e) => handleAddComponent(name)} viewBox="0 0 82 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="82" height="74" rx="8" fill="#504F50"/>
            <rect x="16" y="21.5" width="50" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="28.5" width="50" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="35.5" width="50" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="42.5" width="23" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="49.5" width="23" height="3" rx="1.5" fill="#606060"/>
            <rect x="43" y="42.5" width="23" height="3" rx="1.5" fill="#606060"/>
            <rect x="43" y="49.5" width="23" height="3" rx="1.5" fill="#606060"/>
            <text x="50%" y="80%" dominant-baseline="hanging" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                {name}
            </text>        
        </svg>

    </Fragment>
}

export default Introduction;