import React, { Fragment } from "react";

const Svg = ({ name, children, ...props }) => {

    return <Fragment>

        <Fragment>
            <svg viewBox="0 0 82 74" onClick={e => props.handleAddComponent(name)} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="8" fill="#504F50" />
                {children && children}
                {/* center text svg */}
                <text x="50%" y="80%" dominant-baseline="hanging" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                    {name}
                </text>
            </svg>
        </Fragment>
    </Fragment>
};

export default Svg;