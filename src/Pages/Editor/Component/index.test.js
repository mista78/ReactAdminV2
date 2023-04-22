import React, { Fragment } from "react";
import { renderToString } from "react-dom/server";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Frame, { FrameContext } from 'react-frame-component';
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import '@testing-library/jest-dom'

import Components from ".";
import { uuid } from "../../../Utils/tools";

afterEach(cleanup);


Object.keys(Components).map(Component => {
    describe(Component, () => {
        const items = ["setting", "content", "icons"];
        items.map(item => {
            const Compo = Components[Component][item];
            it(`component ${Component} should render method ${item} correctly`, () => {
                expect(Compo).toBeDefined();

            });
            if (item == "icons") {

                it(`should render icon svg for ${item}  correctly`, () => {
                    const { container } = render(<Compo />);
                    const svg = container.querySelector("svg");
                    expect(svg).toBeInTheDocument();
                });

                it(`${item} icon svg is component svg with className svg-component`, () => {
                    const { container } = render(<Compo />);
                    const svg = container.querySelector("svg");
                    expect(svg).toHaveClass("svg-component");
                });

                it(`${item} icon svg not have 2 text tag`, () => {
                    const { container } = render(<Compo />);
                    const svg = container.querySelector("svg");
                    const text = svg.querySelectorAll("text");
                    expect(text.length).toBe(1);
                });
            }
        })
    });
});
