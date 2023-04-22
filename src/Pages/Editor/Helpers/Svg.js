import React, { Fragment } from "react";

const Svg = ({ name, children, ...props }) => {

    return <Fragment>

        <Fragment>
            <svg className="svg-component" viewBox="0 0 82 74" onClick={e => props.handleAddComponent(name)} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="8" fill="#504F50" />
                {children && children}
                {/* center text svg */}
                <text x="50%" y="80%" dominantBaseline="hanging" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    {name}
                </text>
            </svg>
        </Fragment>
    </Fragment>
};

export default Svg;