import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';

const References = ({ data, children }) => {
    const { state, dispatch } = useContext(AppContext);
    const elements = React.Children.toArray(children);
    const elementRef = useRef([elements.map((refs) => React.createRef())]);

    const ElementCloned = elements.map((nodeElem, i) => {
        const reference =
            typeof nodeElem === "function"
                ? { refs: elementRef.current[i] }
                : { ref: elementRef.current[i] };
        return React.cloneElement(nodeElem, {
            ...reference,
            onClick: (e) => {
                if (nodeElem.props.onClick) {
                    nodeElem.props.onClick();
                }
                if(e.target.id === data.id) {
                    dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
                }
            }
        });
    });
    return ElementCloned;
}

export default References;