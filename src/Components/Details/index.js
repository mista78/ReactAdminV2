import React, { useRef, Fragment, useContext, memo } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../store';

const Detail = styled.details`
    &:first-child {
        border-top: 1px solid #2F2F30;
    }
    border-bottom: 1px solid #2F2F30;
    border-radius: 4px;
    margin: 0;
    padding: 0;

    &:last-child {
        border-bottom: 0;
    }
    margin-bottom: 10px;
        summary {
            cursor: pointer;
            padding: 10px;
            margin: 0;
            &::-webkit-details-marker  {
                display: none;
            }
            font-weight: 600;
            color: #fff;
        }
        .details__body {
            padding: 10px;
            &.row {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 10px;
            }
        }
`;


export const Details = memo(({ children, title, id, row = "row", visible = false, onClick, open = false }) => {
    const { state } = useContext(AppContext);
    const ref = useRef(null);
    return <Fragment>
        {(state?.currentSetting == id || visible) && <Detail  ref={ref} className='details' open={open}>
            <summary className='details__summary' onClick={() => {
                onClick && onClick();
            }}>{title}</summary>
            <div className={`details__body ${row}`}>
                {children}
            </div>
        </Detail>}
    </Fragment>

});