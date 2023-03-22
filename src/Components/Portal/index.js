import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { createPortal } from 'react-dom';
const selector = (elements, root) => {
    const select = root || document;
    return [...select.querySelectorAll(elements)];
}
const build = (data, index) => {
    const { tags = 'div', children, content, event, attributes } = data;
    const elements = document.createElement(tags);
    event && elements.addEventListener(event.type, e => event.callback(e));
    attributes && attributes.map(attr => elements.setAttribute(...attr));
    content && (elements.innerHTML = content);
    children && children.map(child => elements.appendChild(build(child, index)));
    return elements;
};
const Portal = ({ children, id = "portal", className, style }) => {
    className = className || id;
    const exisPortal = selector('#' + id);
    if (exisPortal.length) {
        return createPortal(children, exisPortal[0]);
    }
    const containerPortal = build({
        tag: 'div',
        attributes: [
            ['id', id],
            ['class', className],
            ['style', style]
        ]
    });
    document.body.appendChild(containerPortal);
    return createPortal(children, containerPortal);
};

export default Portal;