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
    .editor {
      border: 1rem solid rgb(47, 47, 48);
      
    }
    .ProseMirror {
        outline: none;
        &:focus {
            outline: none;
        }
        > * + * {
          margin-top: 0.75em;
        }
      
        ul,
        ol {
          padding: 0 1rem;
        }
      
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          line-height: 1.1;
        }
      
        code {
          background-color: rgba(#616161, 0.1);
          color: #616161;
        }
      
        pre {
          background: #0D0D0D;
          color: #FFF;
          font-family: 'JetBrainsMono', monospace;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
      
          code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
          }
        }
      
        img {
          max-width: 100%;
          height: auto;
        }
      
        blockquote {
          padding-left: 1rem;
          border-left: 2px solid rgba(#0D0D0D, 0.1);
        }
      
        hr {
          border: none;
          border-top: 2px solid rgba(#0D0D0D, 0.1);
          margin: 2rem 0;
        }
      }
`;


export const IFrames = ({
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