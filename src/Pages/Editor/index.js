import IFrames from '../../Components/Iframe';
import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { AppContext } from '../../store';
import Portal from '../../Components/Portal';
import { uuid } from '../../Utils/tools';

import AllComponent from './Component/index';

const View = ({ data, setting }) => {
    return <Fragment>
        {data && data?.map((item, index) => {
            const Component = setting ? AllComponent[item.name].setting : AllComponent[item.name];
            if (!Component) return null;
            return <Component key={item.id} data={item} position={index}>
                {item.children && <View data={item.children} parent={data} setting={setting} index={index} />}
            </Component>
        })}
    </Fragment>
};
const BodyEditor = styled.div`
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: grid;
        grid-template-columns: 2fr 6fr 2fr;
        grid-column-gap: 1rem;

        .left {
            background-color: #f1f1f1;
            height: 100%;
            width: 100%;
            position: relative;
        }

        .center {
            background-color: #f1f1f1;
            height: 100%;
            width: 100%;
            display: grid;
        }

        .right {
            background-color: #f1f1f1;
            height: 100%;
            width: 100%;
        }
    `;

const Button = styled.button`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: #000;
        color: #fff;
        border: none;
        cursor: pointer;
    `;
const Editor = () => {
    const { state, dispatch } = useContext(AppContext);

    const handleBreaksite = (value, devices) => {
        dispatch({ type: "MODE_BREAKSIZE", breaksize: value });
        dispatch({ type: "DEVICES", devices });
    };

    return (
        <Fragment>
            <Portal id="root">
                <BodyEditor>
                    <div className="left">
                        <Button onClick={
                            () => {
                                const components = state.components;
                                components.push({
                                    id: uuid(),
                                    name: "Line",
                                    parent: null,
                                    children: []
                                });
                                dispatch({
                                    type: 'ADD_COMPONENT'
                                    , components
                                });
                            }
                        }>
                            Add new line
                        </Button>
                        <div className='size'>
                            <div className='btn' onClick={() => handleBreaksite(100, "desktop")}>Desktop</div>
                            <div className='btn' onClick={() => handleBreaksite(50, "mobile")}>Mobile</div>
                        </div>

                        <div id="sidebar">
                            <View data={state.components} setting={true} />
                        </div>
                    </div>
                    <div className="center">
                        <IFrames>
                            <View data={state.components} />
                        </IFrames>
                    </div>
                    <div className="right">
                        <div id='setting'>
                        </div>
                    </div>
                </BodyEditor>
            </Portal>
        </Fragment>
    );
};

export default Editor;