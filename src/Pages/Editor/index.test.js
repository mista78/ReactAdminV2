import React, { Fragment } from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Frame, { FrameContext } from 'react-frame-component';

import { AppContext, StateProvider } from '../../store';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'


// mock the iframe
jest.mock('react-frame-component', () => {
    const React = require('react');
    const FrameContext = React.createContext({});
    const Frame = ({ children }) => {
        return (
            <FrameContext.Provider value={{}}>
                {children}
            </FrameContext.Provider>
        );
    };
    Frame.FrameContext = FrameContext;
    return Frame;
});


import Editor from ".";

afterEach(cleanup);
/**
 * @jest-environment jsdom
 */

import Data from "./mocks"

describe("Editor", () => {
    test("should render Editor correctly", () => {
        // fake store for testing
        const { container } = render(<Editor data={Data} />,);
        // screen.debug();

        expect(container.querySelector("#root")).toBeInTheDocument();

        const infos = container.querySelector(".infos");
        expect(infos).toBeInTheDocument();
        const devices = container.querySelector(".devices");
        expect(devices).toBeInTheDocument();

        const publication = container.querySelector(".publication");
        expect(publication).toBeInTheDocument();
        expect(publication.querySelector(".publication_btn")).toBeInTheDocument();

    });
});