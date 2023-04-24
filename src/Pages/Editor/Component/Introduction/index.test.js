import React, { Fragment } from "react";
import { renderToString } from "react-dom/server";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Frame, { FrameContext } from 'react-frame-component';
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import '@testing-library/jest-dom'

import { AppContext, StateProvider } from '../../../../store';

afterEach(cleanup);

import { uuid } from "../../../../Utils/tools";

import Introduction from ".";

// fake store for testing
const state = {
    components: [],
    modeEdition: false,
    breaksize: false,
    currentPage: 0,
    currentSetting: null,
    html: null,
    publish: false,
    devices: "desktop",
    urls: null,
    Libs: null,
}






// mock store for testing
// jest.mock('../../../../store', () => {
//     const React = require('react');
//     const AppContext = React.createContext({});
//     const dispatch = jest.fn();

//     const StateProvider = ({ children }) => {
//         return (
//             <AppContext.Provider value={{ state, dispatch }}>
//                 {children}
//             </AppContext.Provider>
//         );
//     };
//     return { AppContext, StateProvider };
// });

// renderWithProviders

// const renderWithProviders = (ui, options) => {

//     const Wrapper = ({ children }) => {
//         return (
//             <StateProvider>
//                 {children}
//             </StateProvider>
//         );
//     };

//     return render(ui, { wrapper: Wrapper, ...options });
// };




describe("Instroduction", () => {
    const data = {
        id: uuid(),
        value: "Introduction",
        parent: null,
        cols: '1fr',
        children: []
    };
    const { container } = render(<Introduction.setting data={data} />);
    const divIdIntro = document.createElement("div");
    divIdIntro.id = "Intro";
    container.appendChild(divIdIntro);
    test("should render correctly", () => {
        expect(container.querySelector('.Setting')).toBeInTheDocument();
        const listItem = container.querySelector(".addItem");
        listItem.click();
        const item = container.querySelector(".toto");
        expect(item).toBeInTheDocument();
    });

});