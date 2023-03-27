import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import styled from 'styled-components';

const Border = styled.div`
    .borderRadius {
        display: flex;
        &_top, &_bottom {
            &_left, &_right {
                display: flex;
                align-items: baseline;
                padding: 0.2rem 0.5rem;
                border: 1px #2F2F30 solid;
            }
        }

    }
`;

const BorderRadius = ({ data }) => {
    const { state, dispatch } = useContext(AppContext);
    const range = 10;
    const step = 0.5;

    const [name, setName] = useState("borderRadius");
    const [style, setStyle] = useState("all");
    const [borderTopLeftRadius, setBorderTopLeftRadius] = useState(data[state.devices] ? data[state.devices][`${name}TopLeftRadius`] || "0" : "0");
    const [borderTopRightRadius, setBorderTopRightRadius] = useState(data[state.devices] ? data[state.devices][`${name}TopRightRadius`] || "0" : "0");
    const [borderBottomRightRadius, setBorderBottomRightRadius] = useState(data[state.devices] ? data[state.devices][`${name}BottomRightRadius`] || "0" : "0");
    const [borderBottomLeftRadius, setBorderBottomLeftRadius] = useState(data[state.devices] ? data[state.devices][`${name}BottomLeftRadius`] || "0" : "0");

    const common = (borderBottomLeftRadius?.replace("rem", "") == borderBottomRightRadius?.replace("rem", "") &&
        borderBottomRightRadius?.replace("rem", "") == borderTopLeftRadius?.replace("rem", "") &&
        borderTopLeftRadius?.replace("rem", "") == borderTopRightRadius?.replace("rem", "")) &&
        borderBottomLeftRadius?.replace("rem", "") || "0";

    const handleChangeAll = (e) => {
        borderBottomLeftRadius(e.target.value);
        borderBottomRightRadius(e.target.value);
        borderTopLeftRadius(e.target.value);
        borderTopRightRadius(e.target.value);
    }

    useEffect(() => {
        setBorderTopLeftRadius(data[state.devices] ? data[state.devices][`${name}TopLeftRadius`] || "0" : "0");
        setBorderTopRightRadius(data[state.devices] ? data[state.devices][`${name}TopRightRadius`] || "0" : "0");
        setBorderBottomRightRadius(data[state.devices] ? data[state.devices][`${name}BottomRightRadius`] || "0" : "0");
        setBorderBottomLeftRadius(data[state.devices] ? data[state.devices][`${name}BottomLeftRadius`] || "0" : "0");
    }, [name, state.devices]);

    useEffect(() => {
        // console.log(state.components);
    }, [state.components])


    return <Fragment>

        <Border>
            <div className="borderRadius">
                <div className="borderRadius_top_left" onClick={e => setStyle("borderTopLeftRadius")}> 
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.5C0 2.46243 2.46243 0 5.5 0H10.3889C10.7264 0 11 0.273604 11 0.611111C11 0.948618 10.7264 1.22222 10.3889 1.22222H5.5C3.13745 1.22222 1.22222 3.13745 1.22222 5.5V10.3889C1.22222 10.7264 0.948618 11 0.611111 11C0.273604 11 0 10.7264 0 10.3889V5.5Z" fill="white"/>
                    </svg>
                    {data[state.devices] && (data[state.devices]["borderTopLeftRadius"] ? data[state.devices]["borderTopLeftRadius"] : 0)}
                </div>
                <div className="borderRadius_top_right" onClick={e => setStyle("borderTopRightRadius")}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.5C11 2.46243 8.53757 0 5.5 0H0.611112C0.273604 0 0 0.273604 0 0.611111C0 0.948618 0.273604 1.22222 0.611112 1.22222H5.5C7.86255 1.22222 9.77778 3.13745 9.77778 5.5V10.3889C9.77778 10.7264 10.0514 11 10.3889 11C10.7264 11 11 10.7264 11 10.3889V5.5Z" fill="white"/>
                    </svg>
                    {data[state.devices] && (data[state.devices]["borderTopRightRadius"] ? data[state.devices]["borderTopRightRadius"] : 0)}
                </div>
                <div className="borderRadius_bottom_right" onClick={e => setStyle("borderBottomRightRadius")}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.5C0 8.53757 2.46243 11 5.5 11H10.3889C10.7264 11 11 10.7264 11 10.3889C11 10.0514 10.7264 9.77778 10.3889 9.77778H5.5C3.13745 9.77778 1.22222 7.86255 1.22222 5.5V0.611112C1.22222 0.273604 0.948618 0 0.611111 0C0.273604 0 0 0.273604 0 0.611112V5.5Z" fill="white"/>
                    </svg>
                    {data[state.devices] && (data[state.devices]["borderBottomRightRadius"] ? data[state.devices]["borderBottomRightRadius"] : 0)}
                </div>
                <div className="borderRadius_bottom_left" onClick={e => setStyle("borderBottomLeftRadius")}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.5C11 8.53757 8.53757 11 5.5 11H0.611112C0.273604 11 0 10.7264 0 10.3889C0 10.0514 0.273604 9.77778 0.611112 9.77778H5.5C7.86255 9.77778 9.77778 7.86255 9.77778 5.5V0.611112C9.77778 0.273604 10.0514 0 10.3889 0C10.7264 0 11 0.273604 11 0.611112V5.5Z" fill="white"/>
                    </svg>
                    {data[state.devices] && (data[state.devices]["borderBottomLeftRadius"] ? data[state.devices]["borderBottomLeftRadius"] : 0)}
                </div>
            </div>
            <div>
                {style == "all" && <Fragment>
                    <div className='input'><select value={name} onChange={e => setName(e.target.value)} onClicke={e => setName(e.target.value)} >
                        <option value="borderRadius">borderRadius</option>
                    </select></div>
                    <input type="range" min={0} max={range} step={step} value={common} onChange={handleChangeAll} />
                </Fragment>}
            </div>
            <Fragment>
                {[`TopLeftRadius`, `TopRightRadius`, `BottomRightRadius`, `BottomLeftRadius`].map(dir => {
                    const names = "border" + dir;
                    return <Fragment>
                        {style === `${names}` && <div>
                            <div>
                                <label htmlFor={names}>{name} {dir}</label>
                            </div>
                            <input
                                id={names}
                                type="range" min={0} max={range} step={step}
                                value={data[state.devices] ? data[state.devices][`${names}`]?.replace('rem', "") || 0 : 0}
                                onChange={e => {
                                    const style = {
                                        ...data[state.devices],
                                        [`${names}`]: e.target.value?.replaceAll("rem", "") + 'rem',
                                    }
                                    Object.keys(style).forEach(key => {
                                        if (style[key] === 0 || style[key] === "0" || style[key] === "0rem") {
                                            delete style[key];
                                        }
                                    });
                                    const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, style));
                                    dispatch({ type: "ADD_COMPONENT", components });
                                }} />
                        </div>}
                    </Fragment>
                })}
            </Fragment>
        </Border>
    </Fragment>

}

export default memo(BorderRadius);