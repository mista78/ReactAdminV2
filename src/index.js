import React, { Fragment } from 'react';
import ReactDom, { hydrate, render } from 'react-dom';
import Data from "./Config/pages";
import { StateProvider } from './store';
import { createGlobalStyle } from 'styled-components';



const GlobalStyle = createGlobalStyle`
    html, body, #root {
        height: 100%;
        background-color: #2F2F30;
        font-family: "Roboto", sans-serif;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .btn {
      display: grid;
      align-items: center;
    }
    svg {
      cursor: pointer;
    }
`;

const Component = Data["Editor"];
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Fragment>
    <GlobalStyle />
    <StateProvider>
      <Component />
    </StateProvider>
  </Fragment>, rootElement);
} else {
  render(<Fragment>
    <GlobalStyle />
    <StateProvider>
      <Component />
    </StateProvider>
  </Fragment>, rootElement);
}