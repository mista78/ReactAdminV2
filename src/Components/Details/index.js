import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../store';
const Details = ({ children, title, id, row = "row", onClick, open = false }) => {
    const { state, dispatch } = useContext(AppContext);
    return <Fragment>
        {state.currentSetting == id && <details className='details' open={open}>
            <summary className='details__summary' onClick={() => {
                onClick && onClick();
            }}>{title}</summary>
            <div className={`details__body ${row}`}>
                {children}
            </div>
        </details>}
    </Fragment>

};

export default Details;