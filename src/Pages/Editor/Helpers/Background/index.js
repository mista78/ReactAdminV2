import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';

import styled from 'styled-components';

const Backgrounds = styled.div`
color: #fff;
border: 1px solid #2F2F30;
display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    padding: .5rem;
label {
    background-color: #3453F5;
    color: white;
    padding: 0.5rem;
    font-family: sans-serif;
    border-radius: 0.3rem;
    cursor: pointer;
  }
  
  #file-chosen{
    margin-left: 0.3rem;
    font-family: sans-serif;
    text-overflow: ellipsis;
    max-width: 160px;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
  }
  `;

const Background = ({ data }) => {

    const { state, dispatch } = useContext(AppContext);
    const [backgroundColor, setBackgroundColor] = useState(data[state.devices] ? data[state.devices]?.backgroundColor || "#000" : "#000");
    const [backgroundImage, setBackgroundImage] = useState(data[state.devices] ? data[state.devices]?.backgroundImage || "" : "");
    const refName = useRef(null);

    const handleChange = (e) => {
        setBackgroundColor(e.target.value);
    }

    const handleSetBackground = () => {
        const background = {
            ...data[state.devices],
            backgroundColor: backgroundColor,
            backgroundImage: backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        Object.keys(background).forEach(key => {
            if (background[key] === "") {
                delete background[key];
            }
        });
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, background));
        dispatch({ type: "ADD_COMPONENT", components });
    }

    useEffect(() => {
        handleSetBackground();
    }, [backgroundColor, backgroundImage]);

    useEffect(() => {
        setBackgroundColor(data[state.devices] ? data[state.devices]?.backgroundColor || "#000" : "#000");
        setBackgroundImage(data[state.devices] ? data[state.devices]?.backgroundImage || "" : "");
    }, [state.devices]);

    return (
        <Fragment>
            <div>
                <label htmlFor="background">Upload file</label>
                {backgroundImage && <button onClick={() => {
                    setBackgroundImage("");
                    refName.current.innerHTML = "Aucun fichier";
                }}> Reset Image </button>}
            </div>
            <Backgrounds>
                <input type="file" id="actual-btn" hidden onChange={(e) => {
                    const { files } = e.target;
                    const [file] = files;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const { result } = e.target;
                        const value = result ? `url('${result}')` : 'none';
                        setBackgroundImage(value);
                        refName.current.innerHTML = file.name;
                    };
                    reader.readAsDataURL(file);
                    e.target.value = null;
                }} />
                <label for="actual-btn">Choisir</label>
                <p id="file-chosen" ref={refName}>Aucun fichier</p>
            </Backgrounds>
            <div className="form-group">
                <label htmlFor="background">Background</label>
                <input type="color" className="form-control" id="background" value={backgroundColor} onChange={handleChange} />
                {backgroundColor && <button onClick={() => {
                    setBackgroundColor("");
                    refName.current.innerHTML = "Aucun fichier";
                }}> Reset Color </button>}
            </div>
        </Fragment>
    );

}

export default memo(Background);