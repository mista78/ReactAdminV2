import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { uuid, kebabize } from '../../../../Utils/tools';
import { Portal, Details, Remove, Reorder, MediaUploader } from '../../../../Components';
import { Spaces, ScriptInject } from '../../Helpers';
import styled from 'styled-components';
import ListItem from '@tiptap/extension-list-item';
import Svg from '../../Helpers/Svg';
import { useId } from 'react';
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

    ${props => props.mobile ? props.mobile : ''}

@media (min-width: 768px) {
    ${props => props.desktop ? props.desktop : ''}
}
`;

function ElementMaker({ state, data, dispatch, className, key, ...props }) {
    const [fullName, setFullName] = useState(data?.values ? data?.values : "text");
    const [showInputEle, setShowInputEle] = useState(false);

    const handleUpdateValue = (value) => {
        const components = data.values ? state.components.map(item => updatePropertyById(data?.id, item, "values", [{...data.values}, {"value": value, "key": key}])) : state.components.map(item => updatePropertyById(data?.id, item, "values", [{"value": value, "key": key}]));
        dispatch({ type: "ADD_COMPONENT", components });
    }

    const handleBlur = () => {
        fullName && setShowInputEle(false);
        handleUpdateValue(typeof fullName !== "string" ? fullName.map(item => item) : fullName);
    }

    return (
        <Fragment>
            {
                showInputEle ? (
                    <input
                        className={`${className} toto`}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="text"
                        autoFocus
                    />
                ) : (
                    <props.tag className={`${className} toto`} onClick={() => setShowInputEle(true)}>{fullName}</props.tag>
                )
            }
        </Fragment>
    );
}

const Introduction = ({ data, children, Libs, ...props }) => {
    console.log("data", data);
    const { state, dispatch } = useContext(AppContext);

    return (
        <Fragment>
            <ScriptInject Libs={Libs} name="Slider" />
            <Lines style={(data[state?.devices] ? data[state.devices] : {})}>
                <Intro id="Intro">

                </Intro>
            </Lines>
        </Fragment>
    );
}

Introduction.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);
    
    const [current, setCurrent] = useState(data);

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data?.id, item, state.devices, value));
        dispatch({ type: "ADD_COMPONENT", components });
    }

    const handleAddElement = (tag, className) => {
        const element = current?.element ? [...current?.element, { tag, className }] : [{ tag, className }];
        setCurrent({ ...current, element });
    }

    useEffect(() => {
        const components = state?.components.map(item => updatePropertyById(data?.id, item, null, current));
        dispatch && dispatch({ type: "ADD_COMPONENT", components });
    }, [current]);

    return <div className='Setting'>
        <button className='lol' onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data?.id });
        }}>Setting {data?.id}</button>
        <button className='addItem' onClick={(e) => handleAddElement("li", "lists_heading")}>listItem</button>
        <Fragment>
            <Portal id="Intro">
                {current?.element ? current?.element.map((item, index) => {
                    return <Fragment>
                        <ElementMaker key={index} state={state} data={data} dispatch={dispatch} tag={item.tag} className={item.className} />
                    </Fragment>
                }) : null}
            </Portal>
        </Fragment>

        <Portal id="setting">
            <Details title="Setting" id={data?.id} open={true}>
                <div>Setting : {data?.id}</div>
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
            <Details title="Spaces" id={data?.id} open={true}>
                <Spaces data={data} />
            </Details>
        </Portal>
    </div>
}

Introduction.content = ({ data, Libs, children }) => {
    const mobile = (data['mobile'] ? data['mobile'] : {});
    const desktop = (data['desktop'] ? data['desktop'] : {});
    return <Fragment>
        <Intro mobile={Object.keys(mobile).map((item, index) => {
            return kebabize(item) + ':' + mobile[item] + ';'
        }).join('')} desktop={Object.keys(desktop).map((item, index) => {
            return kebabize(item) + ':' + desktop[item] + ';'
        }).join('')}  >
            <ScriptInject.content Libs={Libs} name="Slider" />
            {data?.content ? data?.content : 'Default content'}
        </Intro>
        {children && children}
    </Fragment>

}

Introduction.icons = ({ handleAddComponent, name }) => {
    return <Fragment>
        <Svg handleAddComponent={handleAddComponent} name={name}>
            <rect x="16" y="21.5" width="50" height="3" rx="1.5" fill="#606060" />
            <rect x="16" y="28.5" width="50" height="3" rx="1.5" fill="#606060" />
            <rect x="16" y="35.5" width="50" height="3" rx="1.5" fill="#606060" />
            <rect x="16" y="42.5" width="23" height="3" rx="1.5" fill="#606060" />
            <rect x="16" y="49.5" width="23" height="3" rx="1.5" fill="#606060" />
            <rect x="43" y="42.5" width="23" height="3" rx="1.5" fill="#606060" />
            <rect x="43" y="49.5" width="23" height="3" rx="1.5" fill="#606060" />
        </Svg>

    </Fragment>
}

export default Introduction;