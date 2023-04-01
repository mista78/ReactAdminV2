import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import styled from 'styled-components';

const Border = styled.div`
    .element {
        width: fit-content;
        margin-inline: auto;
        padding-block-end: 1rem;
        text-align: center;
        cursor: pointer;
        &_svgFirst {
            margin-inline-end: 0.5rem;
        }
    }
    .test {
        display: grid;
        grid-template-columns: 1fr;
    }

    .range {
        position: absolute;
        bottom: -50%;
        left: 0;
    }
    .border {
        display: flex;
        justify-content: center;
        position: relative;
        padding-bottom: 1.5rem;
        &Top, &Bottom {
            &LeftRadius, &RightRadius {
                display: flex;
                align-items: baseline;
                padding: 0.2rem 0.5rem;
                border: 1px #2F2F30 solid;
                & input {
                    width: 40px;
                    padding-inline-start: 0.5rem;
                    border: none;
                    background-color: #1D1D1C;
                    color: #fff;
                    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        -moz-appearance: textfield;
                    }
                }
            }
        }
        &_select {
            padding-block: 1rem;
            & select {
                border: none;
                background-color: #1D1D1C;
                color: #fff;
                font-weight: bold;
            }
        }
    }
`;



const BorderRadius = ({ data }) => {
    const { state, dispatch } = useContext(AppContext);
    const range = 10;
    const step = 0.5;

    const [name, setName] = useState("border");
    const [style, setStyle] = useState("all");
    const [borderTopLeftRadius, setBorderTopLeftRadius] = useState(data[state.devices] ? data[state.devices][`${name}TopLeftRadius`] || "0" : "0");
    const [borderTopRightRadius, setBorderTopRightRadius] = useState(data[state.devices] ? data[state.devices][`${name}TopRightRadius`] || "0" : "0");
    const [borderBottomRightRadius, setBorderBottomRightRadius] = useState(data[state.devices] ? data[state.devices][`${name}BottomRightRadius`] || "0" : "0");
    const [borderBottomLeftRadius, setBorderBottomLeftRadius] = useState(data[state.devices] ? data[state.devices][`${name}BottomLeftRadius`] || "0" : "0");

    const svgRadius = {
        borderTopLeftRadius: {
            svg: () => {
                return <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.5C0 2.46243 2.46243 0 5.5 0H10.3889C10.7264 0 11 0.273604 11 0.611111C11 0.948618 10.7264 1.22222 10.3889 1.22222H5.5C3.13745 1.22222 1.22222 3.13745 1.22222 5.5V10.3889C1.22222 10.7264 0.948618 11 0.611111 11C0.273604 11 0 10.7264 0 10.3889V5.5Z" fill="white" />
                </svg>
            },
            method: setBorderTopLeftRadius
        },
        borderTopRightRadius: {
            svg: () => {
                return <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.5C11 2.46243 8.53757 0 5.5 0H0.611112C0.273604 0 0 0.273604 0 0.611111C0 0.948618 0.273604 1.22222 0.611112 1.22222H5.5C7.86255 1.22222 9.77778 3.13745 9.77778 5.5V10.3889C9.77778 10.7264 10.0514 11 10.3889 11C10.7264 11 11 10.7264 11 10.3889V5.5Z" fill="white" />
                </svg>
            },
            method: setBorderTopRightRadius
        },
        borderBottomRightRadius: {
            svg:() => {
                return <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.5C11 8.53757 8.53757 11 5.5 11H0.611112C0.273604 11 0 10.7264 0 10.3889C0 10.0514 0.273604 9.77778 0.611112 9.77778H5.5C7.86255 9.77778 9.77778 7.86255 9.77778 5.5V0.611112C9.77778 0.273604 10.0514 0 10.3889 0C10.7264 0 11 0.273604 11 0.611112V5.5Z" fill="white" />
                </svg>
            },
            method: setBorderBottomRightRadius
        },
        borderBottomLeftRadius: {
            svg: () => {
                return <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.5C0 8.53757 2.46243 11 5.5 11H10.3889C10.7264 11 11 10.7264 11 10.3889C11 10.0514 10.7264 9.77778 10.3889 9.77778H5.5C3.13745 9.77778 1.22222 7.86255 1.22222 5.5V0.611112C1.22222 0.273604 0.948618 0 0.611111 0C0.273604 0 0 0.273604 0 0.611112V5.5Z" fill="white" />
                </svg>
            },
            method: setBorderBottomLeftRadius
        }
    }

    const common = (borderBottomLeftRadius?.replace("px", "") == borderBottomRightRadius?.replace("px", "") &&
        borderBottomRightRadius?.replace("px", "") == borderTopLeftRadius?.replace("px", "") &&
        borderTopLeftRadius?.replace("px", "") == borderTopRightRadius?.replace("px", "")) &&
        (parseInt(borderBottomLeftRadius?.replace("px", "")) / 16) || "0";

    const handleChangeAll = (e) => {
        const base = 16;
        const px = (e.target.value * base) + "px";
        setBorderTopLeftRadius(px);
        setBorderTopRightRadius(px);
        setBorderBottomRightRadius(px);
        setBorderBottomLeftRadius(px);
    }

    const handleSetBorderRadius = () => {
        const border = {
            ...data[state.devices],
            [`${name}TopLeftRadius`]: borderTopLeftRadius?.replaceAll("px", "") + 'px',
            [`${name}TopRightRadius`]: borderTopRightRadius?.replaceAll("px", "") + 'px',
            [`${name}BottomRightRadius`]: borderBottomRightRadius?.replaceAll("px", "") + 'px',
            [`${name}BottomLeftRadius`]: borderBottomLeftRadius?.replaceAll("px", "") + 'px'
        };
        Object.keys(border).forEach(key => {
            if (border[key] === 0 || border[key] === "0" || border[key] === "0px") {
                delete border[key];
            }
        });
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, border));
        dispatch({ type: "ADD_COMPONENT", components });
    }

    useEffect(() => {
        handleSetBorderRadius();
    }, [borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius]);

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
            <div className="border">
                {[`TopLeftRadius`, `TopRightRadius`, `BottomRightRadius`, `BottomLeftRadius`].map(dir => {
                    const names = "border" + dir;
                    const Svg = svgRadius[names].svg;
                    const setType = svgRadius[names].method;
                    return <Fragment>
                        <div className='test'>
                            <div className={names} onClick={e => setStyle(names)}>
                                <Svg />
                                <input
                                    id={names}
                                    type="number"
                                    value={data[state.devices] ? data[state.devices][names]?.replace("px", "") || 0 : 0}
                                    onChange={e => {
                                        const style = {
                                            ...data[state.devices],
                                            [names]: e.target.value + 'px',
                                        }
                                        Object.keys(style).forEach(key => {
                                            if (style[key] === 0 || style[key] === "0" || style[key] === "0px") {
                                                delete style[key];
                                            }
                                        });
                                        setType(e.target.value + 'px');
                                        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, style));
                                        dispatch({ type: "ADD_COMPONENT", components });
                                    }}
                                />
                            </div>
                            {style === `${names}` && <div className='range'>
                                <div>
                                    <label htmlFor={names}>{name} {dir}</label>
                                </div>
                                <input
                                    id={names}
                                    onBlur={e => setStyle("all")}
                                    type="range" min={0} max={range} step={step}
                                    value={data[state.devices] ? (parseInt(data[state.devices][`${names}`]?.replace('px', "")) / 16) || 0 : 0}
                                    onChange={e => {
                                        const base = 16;
                                        const px = e.target.value * base;
                                        const style = {
                                            ...data[state.devices],
                                            [`${names}`]: px + 'px',
                                        };
                                        setType(px + 'px');
                                        Object.keys(style).forEach(key => {
                                            if (style[key] === 0 || style[key] === "0" || style[key] === "0px") {
                                                delete style[key];
                                            }
                                        });
                                        
                                        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, style));
                                        dispatch({ type: "ADD_COMPONENT", components });
                                    }}
                                />
                            </div>}
                        </div>
                    </Fragment>
                })}
            </div>
            <div>
                {style == "all" && <Fragment>
                    <input type="range" min={0} max={range} step={step} value={common} onChange={handleChangeAll} />
                    <p>{common} rem</p>
                </Fragment>}
            </div>
        </Border>
    </Fragment>

}

export default memo(BorderRadius);