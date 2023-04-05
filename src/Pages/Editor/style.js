import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';


const Header = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background-color: #1D1D1C;
        select {
            border: none;
            background: transparent;
            line-height: 1.5;
            color: #fff;
        }
        .infos {
            display: flex;
            color: #fff;
        }

        .devices {
            display: flex;
            border-radius: 10px;
            background-color: #2F2F30;
        }

        .publication {
            display: flex;
            color: #fff;
            &_btn {
                display: flex;
                align-items: center;
                font-size: 0.9rem;
                padding: 0.5rem 1.5rem;
                border-radius: 10px;
                background-color: #3453F5;
            }
        }
`;

const BodyEditor = styled.div`
        width: 100%;
        height: calc(100% - 30.8px);
        background-color: #2F2F30;
        display: grid;
        grid-template-columns: 70px 2fr 6fr 2fr;
        grid-column-gap: 1rem;
        color: #fff;

        

        .hiddenSlider {
            text-align: center;
            background-color: #1D1D1C;
            padding-block-start: 1rem;
            & > svg {
                cursor: pointer;
            }
        }

        .left {
            background-color: #1D1D1C;
            color: #fff;
            height: calc(100% - 1rem);
            border-radius: 1rem;
            width: 100%;
            position: relative;
            margin-top: 1rem;
            & > * > * {
                padding:1rem;
            }
            overflow-y: auto;
        }

        .center {
            height: calc(100% - 1rem);
            border-radius: 1rem;
            width: 100%;
            display: grid;
            margin-top: 1rem;
        }

        .right {
            background-color: #1D1D1C;;
            height: calc(100% - 1rem);
            border-radius: 1rem;
            width: 100%;
            margin-top: 1rem;
            & > * > * {
                padding:1rem;
            }
            overflow-y: auto;
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


export  {
    Header,
    BodyEditor,
    Button
};