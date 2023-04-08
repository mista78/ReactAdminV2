import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';

const ScriptInject = ({ Libs , name}) => {
    useEffect(() => {
        Libs && Libs[name] && eval(Libs[name]);
    }, [])
    return <Fragment>
       {Libs && Libs[name] && <script dangerouslySetInnerHTML={{ __html: Libs[name] }} />}
    </Fragment>

}

ScriptInject.content = ({ Libs, name }) => {
    return <Fragment>
       {Libs && Libs[name] && <script dangerouslySetInnerHTML={{ __html: Libs[name] }} />}
    </Fragment>
}

export default ScriptInject;