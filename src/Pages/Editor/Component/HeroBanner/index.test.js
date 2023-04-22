import React, { Fragment } from "react";
import { renderToString } from "react-dom/server";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Frame, { FrameContext } from 'react-frame-component';
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import '@testing-library/jest-dom'

import HeroBanner from ".";
import { uuid } from "../../../../Utils/tools";






afterEach(cleanup);

describe("HeroBanner", () => {
    const data = {
        id: uuid(),
        value: 'HeroBanner',
        parent: null,
        cols: '1fr',
        children: []
    };


    const sheet = new ServerStyleSheet();
    const html = renderToString(sheet.collectStyles(<HeroBanner data={data} />));
    const styleTags = sheet.getStyleTags();
    const { container } = render(<HeroBanner data={data} />);
    
    it("should render correctly", () => {
        expect(container.querySelector(".heading")).toBeInTheDocument();
        expect(styleTags).toContain('position:absolute;');
        expect(styleTags).toContain('left:1rem;');
        expect(styleTags).toContain('bottom:1rem;');
        expect(styleTags).toContain('font-size:2.5rem;');
        expect(styleTags).toContain('font-weight:700;');
        expect(styleTags).toContain('color:#fff;');
        expect(styleTags).toContain('text-transform:uppercase;');
        
    });

    const items = ["setting", "content", "icons"];
    items.map(item => {
        it(`should render ${item} correctly`, () => {
            expect(HeroBanner[item]).toBeDefined();
        });
    })
        
    
});