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

    test('should render correctly', () => {
        render(<Introduction data={data} />);
    });

    Object.keys(Introduction).map((key) => {
        const Compo = Introduction[key];
        test(`should render method ${key} correctly`, () => {
            expect(Compo).toBeDefined();
        });

        if (key == "icons") {
            test(`should render icon svg for ${key}  correctly`, () => {
                const { container } = render(<Compo />);
                const svg = container.querySelector("svg");
                expect(svg).toBeInTheDocument();
            });

            test(`${key} icon svg is component svg with className svg-component`, () => {
                const { container } = render(<Compo />);
                const svg = container.querySelector("svg");
                expect(svg).toHaveClass("svg-component");
            });

            test(`${key} icon svg not have 2 text tag`, () => {
                const { container } = render(<Compo />);
                const svg = container.querySelector("svg");
                const text = svg.querySelectorAll("text");
                expect(text.length).toBe(1);
            });
        }

        if (key == "content") {

            test(`should render method ${key} correctly`, () => {
                const { container } = render(<Compo data={{...data, content: "lorem"}} />);
                const lorem = screen.getByText("lorem");
                expect(lorem).toBeInTheDocument();
                console.log(container.innerHTML);
            });

        }

        if (key == "setting") {
            test(`should render method ${key} correctly`, () => {
                const { container } = render(<Compo data={data} />);
                const divIdIntro = document.createElement("div");
                divIdIntro.setAttribute("id", "Intro");
                container.appendChild(divIdIntro);
                const addItem = container.querySelector(".addItem");
                addItem.click();
                addItem.click();
                const toto = container.querySelector(".toto");
                expect(toto).toBeInTheDocument();
            });
        }
    })

});