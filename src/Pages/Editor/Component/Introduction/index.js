import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize } from '../../../../Utils/tools';
import {Portal, Details, Remove, Reorder, MediaUploader} from '../../../../Components';
import { Spaces, ScriptInject } from '../../Helpers';
import styled from 'styled-components';
import ListItem from '@tiptap/extension-list-item';
import Svg from '../../Helpers/Svg';
const Lines = styled.div`
    border: 1px solid #000;
`;

const Intro = styled.div`
    display: flex;
    flex-direction: column;
    padding-inline: 10rem;
    color: #fff;
    background-color: #000;
    font-weight: 700;
    .text {
        padding-block: 1rem;
        font-size: 2rem;
    }
    .lists {
        display: flex;
        justify-content: space-between;
        padding-block: 1rem;
        & ul {
            list-style-type: none;
            & li {
                line-height: 1.6rem;
            }
        }
        &_heading {
            color: #A7A7A7;
            padding-block-end: 0.5rem;
        }
    }
`;

function ElementMaker(props) {
    const [fullName, setFullName] = useState(props.data ? props.data : "text");
    const [showInputEle, setShowInputEle] = useState(false);

    useEffect(() => {
    }, [showInputEle])
    return (
        <Fragment>
            {
                showInputEle ? (
                    <input
                        className={props.class}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={props.handleBlur}
                        placeholder="text"
                        autoFocus
                    />
                        ) : (
                            <props.tag className={props.class} onClick={() => setShowInputEle(true)}>{fullName}</props.tag>
                            )
                        }
        </Fragment>
    );
}
const Introduction = ({ data, children,Libs, ...props }) => {
    const { state, dispatch } = useContext(AppContext);
    
    const handleUpdateValue = (value) => {
        const components = state.components.map(item => updatePropertyById(data.id, item, "value", value));
        dispatch({ type: "ADD_COMPONENT", components });
    }
    
    const handleBlur = (e) => {
        fullName && setShowInputEle(false);
        handleUpdateValue(fullName);
    }
    
    return (
        <Fragment>
            <ScriptInject Libs={Libs} name="Slider" />
            <Lines style={(data[state?.devices] ? data[state.devices] : {})}>
               <Intro>
                    <ElementMaker 
                        data={data.value}
                        tag="p"
                        class="text"
                        handleBlur={handleBlur}
                    />
                    <div className='lists'>
                        <ul>
                            <ElementMaker 
                                data={data.value}
                                tag="li"
                                class="lists_heading"
                                handleBlur={handleBlur}
                            />
                            <li>ui design</li>
                            <li>services</li>
                        </ul>
                        <ul>
                            <li className='lists_heading'>Date</li>
                            <li>ui design</li>
                        </ul>
                        <ul>
                            <li className='lists_heading'>ui design</li>
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
        <Svg handleAddComponent={handleAddComponent} name={name}>
            <rect x="16" y="21.5" width="50" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="28.5" width="50" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="35.5" width="50" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="42.5" width="23" height="3" rx="1.5" fill="#606060"/>
            <rect x="16" y="49.5" width="23" height="3" rx="1.5" fill="#606060"/>
            <rect x="43" y="42.5" width="23" height="3" rx="1.5" fill="#606060"/>
            <rect x="43" y="49.5" width="23" height="3" rx="1.5" fill="#606060"/>
        </Svg>

    </Fragment>
}

export default Introduction;