import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';

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

        <BorderRadius>
            <div className="borderRadius">
                <div className="border-top-left-radius" onClick={e => setStyle("borderTopLeftRadius")}> {data[state.devices] && (data[state.devices]["borderTopLeftRadius"] ? data[state.devices]["borderTopLeftRadius"] : 0)}</div>
                <div className="border-top-right-radius" onClick={e => setStyle("borderTopRightRadius")}>{data[state.devices] && (data[state.devices]["borderTopRightRadius"] ? data[state.devices]["borderTopRightRadius"] : 0)}</div>
                <div className="border-bottom-right-radius" onClick={e => setStyle("borderBottomRightRadius")}>{data[state.devices] && (data[state.devices]["borderBottomRightRadius"] ? data[state.devices]["borderBottomRightRadius"] : 0)}</div>
                <div className="border-bottom-left-radius" onClick={e => setStyle("borderBottomLeftRadius")}>{data[state.devices] && (data[state.devices]["borderBottomLeftRadius"] ? data[state.devices]["borderBottomLeftRadius"] : 0)}</div>
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
                    {[`TopLeftRadius`, `TopRightRadius`, `BottomRightRadius`, `BottomLeftRadiusLeft`].map(dir => {
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
        </BorderRadius>
    </Fragment>

}

export default memo(BorderRadius);