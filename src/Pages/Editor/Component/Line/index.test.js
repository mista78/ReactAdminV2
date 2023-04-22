import React, { Fragment } from "react";
import { renderToString } from "react-dom/server";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Frame, { FrameContext } from 'react-frame-component';
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import '@testing-library/jest-dom'

import Line from ".";
import { uuid } from "../../../../Utils/tools";

afterEach(cleanup);

describe("Line", () => {
    const data = {
        id: uuid(),
        name: 'Line',
        parent: null,
        cols: '1fr',
        children: []
    };

    const sheet = new ServerStyleSheet();
    const html = renderToString(sheet.collectStyles(<Line data={data} />));
    const styleTags = sheet.getStyleTags();

    const { container } = render(<Line data={data} />);

    it('should have className common', () => {
        expect(styleTags).toContain('.common{');
        expect(styleTags).toContain('display:flex;');
        expect(styleTags).toContain('position:absolute;');
        expect(styleTags).toContain('top:0;');
        expect(styleTags).toContain('left:50%;');
        expect(styleTags).toContain('transform:translate(-50%,-50%);');
    });

    it('should have className reorder', () => {
        expect(styleTags).toContain('.reorder{');
        expect(styleTags).toContain('display:flex;');
        expect(styleTags).toContain('position:absolute;');
        expect(styleTags).toContain('top:0;');
        expect(styleTags).toContain('left:50%;');
        expect(styleTags).toContain('transform:translate(-50%,-50%);');
    });



});