import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../store';
import updatePropertyById from '../../../Utils/updatePropertyById';


import styled from 'styled-components';

const size = "35px";

const Margin = styled.div`
cursor: pointer;
.margin {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 170px;
    padding: ${size};
    .margin-top {
      &:after {
        content: "";
        position: absolute;
        border-bottom: ${size} solid #504f50;
        border-right: ${size} solid transparent;
        top: 0;
        z-index: 3;
      }
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: ${size};
      background: #000;
      width: 100%;
      background: #000;
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
    .margin-right {
      &:after {
        content: "";
        position: absolute;
        border-top: ${size} solid black;
        border-right: ${size} solid transparent;
        top: 0;
      }
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: ${size};
      height: 100%;
      background: #504f50;
  
      z-index: 1;
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
    .margin-bottom {
      &:after {
        content: "";
        position: absolute;
        border-top: ${size} solid #504f50;
        border-left: ${size} solid transparent;
        right: 0;
      }
      &:before {
        content: "";
        position: absolute;
        border-top: ${size} solid #504f50;
        border-right: ${size} solid transparent;
        left: 0;
      }
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: ${size};
      width: 100%;
      background: #000;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
    .margin-left {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${size};
      height: 100%;
      background: #504f50;
      &:after {
        content: "";
        position: absolute;
        border-top: ${size} solid black;
        border-left: ${size} solid transparent;
        top: 0;
        z-index: 3;
      }
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
  }
  .padding {
    position: absolute;
    top: ${size};
    left: ${size};
    right: ${size};
    bottom: ${size};
    display: flex;
    justify-content: center;
    align-items: center;
    .padding-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: ${size};
      background: #939393;
      width: 100%;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
    .padding-right {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: ${size};
      height: 100%;
      background: #939393;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
    .padding-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: ${size};
      width: 100%;
      background: #939393;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
  
    .padding-left {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${size};
      height: 100%;
      background: #939393;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
  }
  
  .element {
    position: absolute;
    position: absolute;
    top: ${size};
    left: ${size};
    right: ${size};
    bottom: ${size};
    background: black;
  }
  
`;

const Spaces = ({ data }) => {
    const { state, dispatch } = useContext(AppContext);

    const [name, setName] = useState("margin");
    const [style, setStyle] = useState("all");
    const [spacesTop, setSpacesTop] = useState(data[state.devices] ? data[state.devices][`${name}Top`] : "0");
    const [spacesRight, setSpacesRight] = useState(data[state.devices] ? data[state.devices][`${name}Right`] : "0");
    const [spacesBottom, setSpacesBottom] = useState(data[state.devices] ? data[state.devices][`${name}Bottom`] : "0");
    const [spacesLeft, setSpacesLeft] = useState(data[state.devices] ? data[state.devices][`${name}Left`] : "0");
    const [ind, setInd] = useState(false);

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
        console.log(state.components);
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
        </Margin>
        <div>
            {style == "all" && <Fragment>
                <div><select value={name} onChange={e => setName(e.target.value)} onClicke={e => setName(e.target.value)} >
                    <option value="margin">margin</option>
                    <option value="padding">padding</option>
                </select></div>
                <input type="range" min={0} max={7} value={common} onChange={handleChangeAll} />
            </Fragment>}
        </div>
        {<Fragment>
            {["margin", "padding"].map(name => {
                return <Fragment>
                    {style == `${name}Top` && <div>
                        <div><label>{name} top</label></div>
                        <input type="range" min={0} max={7} value={data[state.devices] ? data[state.devices][`${name}Top`]?.replace('rem', "") : 0} onChange={e => {
                            const style = {
                                ...data[state.devices],
                                [`${name}Top`]: e.target.value?.replaceAll("rem", "") + 'rem',
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
                    {style == `${name}Right` && <div>
                        <div><label>{name} right</label></div>
                        <input type="range" min={0} max={7} value={data[state.devices] ? data[state.devices][`${name}Right`]?.replace('rem', "") : 0} onChange={e => {
                            const style = {
                                ...data[state.devices],
                                [`${name}Right`]: e.target.value?.replaceAll("rem", "") + 'rem',
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
                    {style == `${name}Bottom` && <div>
                        <div><label>{name} bottom</label></div>
                        <input type="range" min={0} max={7} value={data[state.devices] ? data[state.devices][`${name}Bottom`]?.replace('rem', "") : 0} onChange={e => {
                            const style = {
                                ...data[state.devices],
                                [`${name}Bottom`]: e.target.value?.replaceAll("rem", "") + 'rem',
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
                    {style == `${name}Left` && <div>
                        <div><label>{name} left</label></div>
                        <input type="range" min={0} max={7} value={data[state.devices] ? data[state.devices][`${name}Left`]?.replace('rem', "") : 0} onChange={e => {
                            const style = {
                                ...data[state.devices],
                                [`${name}Left`]: e.target.value?.replaceAll("rem", "") + 'rem',
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
        </Fragment>}
    </Fragment>

}

export default memo(Spaces);