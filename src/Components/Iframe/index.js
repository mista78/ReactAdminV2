import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { createPortal } from 'react-dom';
import { AppContext } from '../../store';
import Frame, { FrameContext } from 'react-frame-component';

import styled, { StyleSheetManager, createGlobalStyle } from 'styled-components';

const InjectFrameStyles = (props) => {
    const { document } = useContext(FrameContext);
    return <StyleSheetManager target={document.head}>{props.children}</StyleSheetManager>;
};

const Iframe = styled.iframe`
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        margin: 0 auto;
    `;

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;


const IFrames = ({
    children,
    ...props
}) => {
    const { state, dispatch } = useContext(AppContext);
    const [contentRef, setContentRef] = useState(null);
    const mountNode = contentRef?.contentWindow?.document?.body;
    mountNode && mountNode.classList.add('editor');
    return <Fragment>
        <Frame
            {...props}
            ref={setContentRef}
            width={`${state.breaksize ? state.breaksize + "%" : "100%"}`}
            style={{
                height: "100%",
                border: "none",
                margin: "0",
                padding: "0",
                overflow: "hidden",
                margin: "0 auto",
            }}
            height="100%">
            {mountNode && createPortal(<Fragment>
                <InjectFrameStyles>
                    <GlobalStyle />
                    {children}
                </InjectFrameStyles>
            </Fragment>, mountNode)}
        </Frame>
    </Fragment>;
};

export default IFrames;