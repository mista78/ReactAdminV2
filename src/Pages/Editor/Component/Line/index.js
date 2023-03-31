import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { AppContext } from '../../../../store';
import updatePropertyById from '../../../../Utils/updatePropertyById';
import { kebabize, uuid } from '../../../../Utils/tools';
import search from '../../../../Utils/search';
import Portal from '../../../../Components/Portal';
import Reorder from '../../../../Components/Reorder';
import Duplicate from '../../../../Components/Duplicate';
import Remove from '../../../../Components/Remove';
import Details from '../../../../Components/Details';
import Cols from '../../../../Components/Cols';
import { BorderRadius, Spaces, Background, References } from '../../Helpers';
import styled from 'styled-components';

import AllComponent from '../index';

const Lines = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    border: 1px dashed pink;
    position: relative;
    min-height: 260px;
    .pop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    @media (min-width: 768px) {
        grid-template-columns: ${props => props.child};
    }
    .common {
        position: absolute;
        display: flex;
        top:0;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: .5rem;
        border: 1px solid #ccc;
        button {
            border: none;
            background: transparent;
            cursor: pointer;
        }
    }
    .reorder {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: .5rem;
        border: 1px solid #ccc;
        button {
            border: none;
            background: transparent;
            cursor: pointer;
        }
        left: 0;
    }
`;

const Line = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleUpdateStyle = (value = {}) => {
        value = { ...(data[state.devices] ? data[state.devices] : {}), ...value }
        const components = state.components.map(item => updatePropertyById(data.id, item, state.devices, value));
        dispatch({ type: "UPDATE_COMPONENT", components });
    }
    const test = {
        padding: "1rem"
    }
    return (
        <Fragment>
            <References data={data}>
                <Lines  id={data.id} style={(data[state.devices] ? {...data[state.devices], ...test} : {...test})} child={data?.children.map(item => (item.cols))?.join(' ')} >
                    {state.currentSetting == data.id && <div className="pop">
                        <div className="common">
                            <Cols data={data} />
                            <Duplicate data={data} />
                            <button onClick={e => {
                                dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
                            }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.9856 0.909088C6.79032 0.928785 6.61586 1.08242 6.57196 1.27348L6.20279 2.84924C6.00694 2.91818 5.81588 2.99612 5.63158 3.0856L4.25279 2.23385C4.07326 2.12411 3.82058 2.15394 3.67173 2.30279L2.298 3.66695C2.1469 3.81636 2.11679 4.0727 2.22906 4.25279L3.08588 5.64143C3.00034 5.82123 2.92493 6.00441 2.85937 6.19294L1.27376 6.56718C1.06722 6.61558 0.907961 6.8179 0.909086 7.02978V8.96515C0.907961 9.17731 1.06722 9.37935 1.27348 9.42803L2.8543 9.7972C2.92324 9.99108 3.00231 10.1771 3.09067 10.3586L2.22906 11.7424C2.11679 11.9228 2.1469 12.1791 2.298 12.3283L3.67173 13.6972C3.82058 13.8461 4.07326 13.8759 4.25279 13.7661L5.63664 12.9093C5.81898 12.9982 6.00835 13.0767 6.20279 13.1457L6.57196 14.7214C6.61811 14.928 6.81818 15.0892 7.02978 15.0906H8.96993C9.18153 15.0892 9.3816 14.9277 9.42774 14.7214L9.79692 13.1457C9.99276 13.0767 10.1838 12.9988 10.3681 12.9093L11.7469 13.7661C11.9264 13.8759 12.1791 13.8461 12.328 13.6972L13.6969 12.3283C13.848 12.1788 13.8781 11.9225 13.7659 11.7424L12.9093 10.3636C12.998 10.1807 13.0773 9.99164 13.1457 9.79749L14.7265 9.42831C14.9328 9.37963 15.092 9.17731 15.0909 8.96543V7.03034C15.092 6.81818 14.9328 6.61614 14.7265 6.56746L13.1457 6.19801C13.0776 6.00441 12.9977 5.81898 12.9093 5.63664L13.7661 4.25279C13.8784 4.07242 13.8483 3.81608 13.6972 3.66695L12.3283 2.30279C12.1794 2.15394 11.9267 2.12411 11.7472 2.23385L10.3732 3.08588C10.1869 2.99584 9.99417 2.91846 9.79692 2.84952L9.42774 1.27376C9.37963 1.06863 9.18041 0.910214 8.97021 0.909088H6.9856ZM7.4043 1.85454H8.59597L8.93082 3.2972C8.96796 3.46097 9.09908 3.60026 9.26088 3.64697C9.58644 3.74095 9.89653 3.86617 10.1866 4.02627C10.3324 4.10759 10.5221 4.10365 10.6644 4.01643L11.925 3.23361L12.7622 4.07073L11.9841 5.3364C11.8952 5.47794 11.8896 5.66731 11.9695 5.8142C12.1299 6.10515 12.2604 6.41749 12.3536 6.73995C12.4009 6.89837 12.5373 7.02697 12.6983 7.06495L14.146 7.40459V8.59147L12.6983 8.9311C12.5362 8.96993 12.3995 9.10078 12.3536 9.26117C12.2604 9.58363 12.1299 9.89119 11.9695 10.1821C11.8896 10.3287 11.8955 10.5184 11.9841 10.6599L12.7622 11.9256L11.925 12.7678L10.6594 11.9799C10.5173 11.8924 10.3276 11.8885 10.1819 11.9698C9.8909 12.1299 9.58335 12.2607 9.26116 12.3539C9.10077 12.3997 8.96993 12.5365 8.9311 12.6986L8.59147 14.1463H7.40965L7.07002 12.6986C7.03119 12.5365 6.90034 12.3997 6.73995 12.3539C6.42086 12.2616 6.11584 12.1302 5.82404 11.9698C5.67829 11.8885 5.48863 11.8924 5.34653 11.9796L4.07608 12.7675L3.23389 11.9253L4.01671 10.6549C4.10562 10.5136 4.11125 10.324 4.03134 10.1774C3.87095 9.88556 3.73954 9.58054 3.64725 9.26145C3.60138 9.10106 3.46463 8.97021 3.30255 8.93138L1.85482 8.59175V7.40487L3.30733 7.06017C3.46829 7.02218 3.60476 6.89359 3.65203 6.73517C3.74573 6.41242 3.87067 6.1029 4.02627 5.81926C4.1059 5.67463 4.10196 5.48779 4.01642 5.34653L3.23361 4.0713L4.07551 3.23417L5.34119 4.01699C5.48357 4.10422 5.67294 4.10816 5.81898 4.02684C6.10993 3.86645 6.41748 3.74067 6.73967 3.64753C6.90119 3.60082 7.03231 3.46182 7.06974 3.29777L7.40458 1.85511L7.4043 1.85454ZM8.00028 5.00606C6.35248 5.00606 5.00634 6.3522 5.00634 8C5.00634 9.64779 6.35248 10.9939 8.00028 10.9939C9.64807 10.9939 10.9942 9.64779 10.9942 8C10.9942 6.3522 9.64807 5.00606 8.00028 5.00606ZM8.00028 5.95151C9.13735 5.95151 10.0488 6.8632 10.0488 8C10.0488 9.13679 9.13735 10.0485 8.00028 10.0485C6.8632 10.0485 5.95179 9.13707 5.95179 8C5.95179 6.86292 6.8632 5.95151 8.00028 5.95151Z" fill="black" stroke="black" stroke-width="0.545455" />
                                </svg>
                            </button>
                            <Remove data={data} />
                        </div>
                        <Reorder data={data} />
                    </div>}
                    {children && children}
                </Lines>
            </References>
        </Fragment>
    );
}

Line.setting = ({ data, children, ...props }) => {
    const { state, dispatch } = useContext(AppContext);

    const handleAddComponent = (e) => {
        const value = e ? e.target.value : 'Line';
        const newBlock = {
            id: uuid(),
            name: "Layouts",
            parent: data.id,
            cols: '1fr',
            children: []
        }
        const components = state.components.map(item => updatePropertyById(data.id, item, 'children', [...data.children, newBlock]));
        dispatch({ type: "ADD_COMPONENT", components });
        e && (e.target.value = '');
    };

    const upDateUuidRecursively = (data, parent) => {
        const id = uuid();
        const newBlock = {
            ...data,
            id,
            parent,
            children: [...(data.children || []).map(item => upDateUuidRecursively(item, id))]
        }
        return newBlock;
    };
    const handleDuplicate = () => {
        const newBlock = {
            ...upDateUuidRecursively(data, data.parent),
        }
        const parent = data.parent ? search([state.components], data.parent) : state.components;
        const parentComp = data.parent ? parent["children"] : parent
        const currentIndex = parentComp.findIndex(item => item.id === data.id);
        parentComp.splice(currentIndex + 1, 0, newBlock);
        if (data.parent) {
            state.components.map((item, index) => updatePropertyById(data.parent, item, 'children', parentComp));
        } else {
            state.components = parentComp;
        }
        dispatch({ type: "ADD_COMPONENT", components: [...state.components] });
    };

    return <Fragment>
        <Details title={`Line ${data.id}`} visible={true} onClick={e => {
            dispatch({ type: 'CURRENT_SETTING', currentSetting: data.id });
        }}>
            lorem  ipsum
        </Details>
        <Portal id="setting">
            <Details title="Setting" id={data.id} open={true}>
                <button onClick={handleAddComponent}>Add Layouts</button>
                {/* <div>Setting : {data.id}</div>
                <Duplicate data={data} />
                <Reorder data={data} />
                <Remove data={data} /> */}
            </Details>
            <Details title="BorderRadius" id={data.id} open={true}>
                <BorderRadius data={data} />
            </Details>
            <Details title="Spaces" id={data.id} open={true}>
                <Spaces data={data} />
            </Details>

            <Details title="Background" id={data.id} open={true}>
                <Background data={data} />
            </Details>
        </Portal>
        {children && children}
    </Fragment>
}

Line.content = ({ data, children }) => {
    const mobile = (data['mobile'] ? data['mobile'] : {});
    const desktop = (data['desktop'] ? data['desktop'] : {});

    const Line = styled(Lines)`
        border: none;
        ${Object.keys(mobile).map((item, index) => {
        return kebabize(item) + ':' + mobile[item] + ';'
    }).join('')}

        @media (min-width: 768px) {
            ${Object.keys(desktop).map((item, index) => {
        return kebabize(item) + ':' + desktop[item] + ';'
    }).join('')}
        }
    `;

    return <Fragment>
        <Line child={data?.children.map(item => (item.cols))?.join(' ')}>
            {children && children}
        </Line>
    </Fragment>

}

export default Line;