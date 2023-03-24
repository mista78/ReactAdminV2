import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';

const Background = ({ data }) => {

    const { state, dispatch } = useContext(AppContext);
    const [backgroundColor, setBackgroundColor] = useState(data[state.devices] ? data[state.devices]?.backgroundColor || "#1E1E1E" : "#1E1E1E");
    const [backgroundImage, setBackgroundImage] = useState(data[state.devices] ? data[state.devices]?.backgroundImage || "" : "");

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
        setBackgroundColor(data[state.devices] ? data[state.devices]?.backgroundColor || "#1E1E1E" : "#1E1E1E");
        setBackgroundImage(data[state.devices] ? data[state.devices]?.backgroundImage || "" : "");
    }, [state.devices]);

    return (
        <Fragment>
            <div>
                <label htmlFor="background">Upload file</label>
                {backgroundImage && <button onClick={() => {
                    setBackgroundImage("");
                } }> Reset Image </button>}
                <input type="file" onChange={(e) => {
                    const { files } = e.target;
                    const [file] = files;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const { result } = e.target;
                        const value = result ? `url('${result}')` : 'none';
                        setBackgroundImage(value);
                    };
                    reader.readAsDataURL(file);
                    e.target.value = null;
                }} />
            </div>
            <div className="form-group">
                <label htmlFor="background">Background</label>
                <input type="color" className="form-control" id="background" value={backgroundColor} onChange={handleChange} />
            </div>
        </Fragment>
    );

}

export default memo(Background);