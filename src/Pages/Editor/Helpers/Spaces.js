import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../store';
import updatePropertyById from '../../../Utils/updatePropertyById';

const Spaces = ({  data }) => {
    const { state, dispatch } = useContext(AppContext);

    const [name, setName] = useState("margin");
    const [spacesTop, setSpacesTop] = useState(data[state.devices] ? data[state.devices][`${name}Top`]: "0");
    const [spacesRight, setSpacesRight] = useState(data[state.devices] ? data[state.devices][`${name}Right`] : "0");
    const [spacesBottom, setSpacesBottom] = useState(data[state.devices] ? data[state.devices][`${name}Bottom`]: "0");
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
        setSpacesRight(data[state.devices] ? data[state.devices][`${name}Right`] || "0": "0");
        setSpacesBottom(data[state.devices] ? data[state.devices][`${name}Bottom`] || "0": "0");
        setSpacesLeft(data[state.devices] ? data[state.devices][`${name}Left`] || "0": "0");
    }, [name,state.devices]);

    useEffect(() => {
        console.log(state.components);
    }, [state.components])
    

    return <Fragment>
        <div>
            <select value={name} onChange={e => setName(e.target.value)} onClicke={e => setName(e.target.value)} >
                <option value="margin">margin</option>
                <option value="padding">padding</option>
            </select>
        </div>
        <div>
            <input type="range" min={0} max={7} value={common} onChange={handleChangeAll} />
            <button onClick={() => setInd(!ind)}>indiv</button>
        </div>
        {ind && <Fragment>
            <div>
                <label>{name} top</label>
                <input type="range" min={0} max={7} value={spacesTop.replace("rem", "")} onChange={e => setSpacesTop(e.target.value)} />
            </div>
            <div>
                <label>{name} right</label>
                <input type="range" min={0} max={7} value={spacesRight.replace("rem", "")} onChange={e => setSpacesRight(e.target.value)} />
            </div>
            <div>
                <label>{name} bottom</label>
                <input type="range" min={0} max={7} value={spacesBottom.replace("rem", "")} onChange={e => setSpacesBottom(e.target.value)} />
            </div>
            <div>
                <label>{name} left</label>
                <input type="range" min={0} max={7} value={spacesLeft.replace("rem", "")} onChange={e => setSpacesLeft(e.target.value)} />
            </div>
        </Fragment>}
    </Fragment>

}

export default memo(Spaces);