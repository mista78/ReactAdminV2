import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';

import { Margin } from './styled';

const Spaces = ({ data }) => {
    const { state, dispatch } = useContext(AppContext);

    const [name, setName] = useState("margin");
    const [style, setStyle] = useState("all");
    const [spacesTop, setSpacesTop] = useState(data[state.devices] ? data[state.devices][`${name}Top`] || "0" : "0");
    const [spacesRight, setSpacesRight] = useState(data[state.devices] ? data[state.devices][`${name}Right`] || "0" : "0");
    const [spacesBottom, setSpacesBottom] = useState(data[state.devices] ? data[state.devices][`${name}Bottom`] || "0" : "0");
    const [spacesLeft, setSpacesLeft] = useState(data[state.devices] ? data[state.devices][`${name}Left`] || "0" : "0");

    const common = (spacesBottom?.replace("rem", "") == spacesLeft?.replace("rem", "") &&
        spacesLeft?.replace("rem", "") == spacesRight?.replace("rem", "") &&
        spacesRight?.replace("rem", "") == spacesTop?.replace("rem", "")) &&
        spacesBottom?.replace("rem", "");

    const handleChangeAll = (e) => {
        setSpacesBottom(e.target.value);
        setSpacesLeft(e.target.value);
        setSpacesRight(e.target.value);
        setSpacesTop(e.target.value);
    }

    const handleSetPadding = () => {
        const padding = {
            ...data[state.devices],
            [`${name}Top`]: spacesTop?.replaceAll("rem", "") + 'rem',
            [`${name}Right`]: spacesRight?.replaceAll("rem", "") + 'rem',
            [`${name}Bottom`]: spacesBottom?.replaceAll("rem", "") + 'rem',
            [`${name}Left`]: spacesLeft?.replaceAll("rem", "") + 'rem'
        }
        Object.keys(padding).forEach(key => {
            if (padding[key] === 0 || padding[key] === "0" || padding[key] === "0rem") {
                delete padding[key];
            }
        });
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, padding));
        dispatch({ type: "ADD_COMPONENT", components });
    }

    useEffect(() => {
        handleSetPadding();
    }, [spacesTop, spacesRight, spacesBottom, spacesLeft]);

    useEffect(() => {
        setSpacesTop(data[state.devices] ? data[state.devices][`${name}Top`] || "0" : "0");
        setSpacesRight(data[state.devices] ? data[state.devices][`${name}Right`] || "0" : "0");
        setSpacesBottom(data[state.devices] ? data[state.devices][`${name}Bottom`] || "0" : "0");
        setSpacesLeft(data[state.devices] ? data[state.devices][`${name}Left`] || "0" : "0");
    }, [name, state.devices]);

    useEffect(() => {
        // console.log(state.components);
    }, [state.components])


    return <Fragment>

        <Margin>
            <div className="margin">
                <div className="margin-top" onClick={e => setStyle("marginTop")}> {data[state.devices] && (data[state.devices]["marginTop"] ? data[state.devices]["marginTop"] : 0)}</div>
                <div className="margin-right" onClick={e => setStyle("marginRight")}>{data[state.devices] && (data[state.devices]["marginRight"] ? data[state.devices]["marginRight"] : 0)}</div>
                <div className="margin-bottom" onClick={e => setStyle("marginBottom")}>{data[state.devices] && (data[state.devices]["marginBottom"] ? data[state.devices]["marginBottom"] : 0)}</div>
                <div className="margin-left" onClick={e => setStyle("marginLeft")}>{data[state.devices] && (data[state.devices]["marginLeft"] ? data[state.devices]["marginLeft"] : 0)}</div>
                <div className='padding'>
                    <div className="padding-top" onClick={e => setStyle("paddingTop")}> {data[state.devices] && (data[state.devices]["paddingTop"] ? data[state.devices]["paddingTop"] : 0)}</div>
                    <div className="padding-right" onClick={e => setStyle("paddingRight")}>{data[state.devices] && (data[state.devices]["paddingRight"] ? data[state.devices]["paddingRight"] : 0)}</div>
                    <div className="padding-bottom" onClick={e => setStyle("paddingBottom")}>{data[state.devices] && (data[state.devices]["paddingBottom"] ? data[state.devices]["paddingBottom"] : 0)}</div>
                    <div className="padding-left" onClick={e => setStyle("paddingLeft")}>{data[state.devices] && (data[state.devices]["paddingLeft"] ? data[state.devices]["paddingLeft"] : 0)}</div>
                    <div className='element' onClick={e => setStyle("all")}>
                    </div>
                </div>
            </div>
            <div>
                {style == "all" && <Fragment>
                    <div className='input'><select value={name} onChange={e => setName(e.target.value)} onClicke={e => setName(e.target.value)} >
                        <option value="margin">margin</option>
                        <option value="padding">padding</option>
                    </select></div>
                    <input type="range" min={0} max={7} value={common} onChange={handleChangeAll} />
                </Fragment>}
            </div>
            {<Fragment>
                {["margin", "padding"].map(name => {
                    return <Fragment>
                        {[`Top`, `Right`, `Bottom`, `Left`].map(dir => {
                            const names = name + dir;
                            return <Fragment>
                                {style === `${names}` && <div>
                                    <div><label>{name} {dir}</label></div>
                                    <input type="range" min={0} max={7} value={data[state.devices] ? data[state.devices][`${names}`]?.replace('rem', "") || 0 : 0} onChange={e => {
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
                })}
            </Fragment>}
        </Margin>
    </Fragment>

}

export default memo(Spaces);