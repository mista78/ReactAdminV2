import React, { useState, useEffect, useRef, Fragment, useContext, memo } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { AppContext, storage } from '../../store';
import { Portal, IFrames } from '../../Components';
import { uuid, GenerateUrl } from '../../Utils/tools';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import axios from 'axios';

import { BodyEditor, Header, Button } from "./style";


import DataUrl from './Urls';

import AllComponent from './Component/index';

const View = ({ data, setting, Libs, type }) => {
    return <Fragment>
        {data && data?.map((item, index) => {
            const Component = (AllComponent[item.name] && type) ? AllComponent[item.name][type] : AllComponent[item.name];
            if (!Component) return null;
            return <Component Libs={Libs} key={item.id} data={item} position={index}>
                {item.children && <View Libs={Libs} data={item.children} parent={data} setting={setting} type={type} position={index} />}
            </Component>
        })}
    </Fragment>
};



const Editor = ({ Libs, data=[] }) => {
    const { state, dispatch } = useContext(AppContext);
    const RequestUrl = GenerateUrl(DataUrl.Editor, ["GET", "POST"]);
    const [pages, setPages] = useState([]);
    const [newPage, setNewPage] = useState(false);


    const handleBreaksite = (value, devices) => {
        dispatch({ type: "MODE_BREAKSIZE", breaksize: value });
        dispatch({ type: "DEVICES", devices });

    };
    useEffect(() => {
        setTimeout(() => {
            const data = storage.get('components');
            const currentSetting = storage.get('currentSetting');
            if (currentSetting) {
                dispatch({ type: "CURRENT_SETTING", currentSetting });
            }
            if (data) {
                dispatch({ type: "ADD_COMPONENT", components: [...data] });
            }
        }, 100)

    }, [])

    const LoadPage = async () => {
        const response = await axios.get(RequestUrl.get.get_pages);
        const { data } = response;
        console.log(data, response);
        if (data && response.status === 200 && Array.isArray(data)) {
            setPages(data);
        }
    };

    useEffect(() => {
        dispatch && dispatch({ type: "DEVICES", urls: { ...RequestUrl } });
        dispatch && dispatch({ type: "ADD_COMPONENT", Libs: Libs });
        LoadPage();
    }, [])

    useEffect(() => {
        storage.set('components', state?.components);
        storage.set('currentSetting', state?.currentSetting);
    }, [state]);

    const test = state?.components ? state.components : data;

    return (
        <Fragment>
            <div id="root">
                <Header>
                    <div className="infos">
                        <svg width="22" height="44" viewBox="0 0 22 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_195_1184)">
                                <path d="M5.18879 5.13877H9.86282V6.78696H11.6441V5.13877H16.4092V13.1269H18.1859V3.3822H18.0948V3.37769H3.41211V3.3822V5.13877V10.4175H5.18879V5.13877Z" fill="#D03A2F" />
                                <path d="M5.18879 26.3214H9.86282V27.9696H11.6441V26.3214H16.4092V34.3411H18.1859V24.5603H18.0948H3.41211V26.3214V34.3411H5.18879V26.3214Z" fill="#D03A2F" />
                                <path d="M15.2658 13.1585V8.44873H15.2521H6.39606V10.2098H6.40061V13.1585H8.17729V10.2098H13.4891V13.1585H15.2658Z" fill="#D03A2F" />
                                <path d="M12.8194 11.8127H8.77405V13.1178H12.8194V11.8127Z" fill="#D03A2F" />
                                <path d="M5.18879 40.6313V37.7232H16.4092V40.6313H18.1859V35.9712H18.0948V35.9622H3.41211V37.7232V40.6313H5.18879Z" fill="#D03A2F" />
                                <path d="M21.6074 1.30952V0H0.00482178V1.21018V42.6453V44H21.6074V42.7447V1.30952ZM19.8307 42.2389H1.7815V1.76108H19.8307V42.2389Z" fill="#D03A2F" />
                                <path d="M15.3341 39.3264H6.17279V40.6314H15.3341V39.3264Z" fill="#D03A2F" />
                                <path d="M18.0948 14.7931H5.18879V12.0657H3.41211V14.7931V16.4774V16.5542H18.0948V14.7931Z" fill="#D03A2F" />
                                <path d="M18.0948 21.1871H11.6441V19.9227H18.0948V18.1616H3.41211V19.9227H9.86282V21.1871H3.41211V22.9527H18.0948V21.1871Z" fill="#D03A2F" />
                                <path d="M6.72406 32.5936V34.3592H14.7829V34.2779H14.8011V29.5681H14.7829H6.72406V31.3292H13.0244V32.5936H6.72406Z" fill="#D03A2F" />
                            </g>
                            <defs>
                                <clipPath id="clip0_195_1184">
                                    <rect width="21.6071" height="44" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M27.1543 11.3755C27.9353 10.5944 27.9353 9.32807 27.1543 8.54703C26.3732 7.76598 25.1069 7.76598 24.3258 8.54703L12.2529 20.62C12.2471 20.6258 12.2413 20.6316 12.2356 20.6375C12.2299 20.6431 12.2241 20.6487 12.2185 20.6544C11.4374 21.4355 11.4374 22.7018 12.2185 23.4828L24.2914 35.5558C25.0725 36.3369 26.3388 36.3369 27.1199 35.5558C27.9009 34.7748 27.9009 33.5084 27.1199 32.7274L16.4611 22.0686L27.1543 11.3755Z" fill="white" />
                        </svg>
                        <div>
                            <p>Page: <select value={state?.currentPage} style={{ display: "inline-block" }}
                                onClick={e => {
                                    console.log(e.target.value);
                                    setNewPage("");
                                }}
                                onChange={e => {
                                    const value = e.target.value;
                                    console.log(value);
                                    if (!value) return;
                                    let data = [];
                                    try {
                                        console.log(pages.find(item => item.ID == value).post_content);
                                        const page = pages.find(item => item.ID == value);
                                        setNewPage(page.post_name);
                                        data = JSON.parse(pages.find(item => item.ID == value).post_content);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                    console.log("comp", data.components);
                                    dispatch({ type: "ADD_COMPONENT", components: (data.components && Array.isArray(data.components)) ? data.components : [] });
                                    dispatch({ type: "CURRENT_PAGE", currentPage: value });
                                }}>
                                <option value="">Page</option>
                                {pages?.map((item, index) => {
                                    return <option key={index} value={item.ID}>{item.post_name}</option>
                                })}
                            </select></p>
                            {newPage == "" ? <input type='text' onBlur={e => {
                                (async () => {
                                    const value = e.target.value;
                                    if (!value) return;
                                    const request = await axios.post(RequestUrl.post.add_page, {
                                        name: value,
                                    });
                                    console.log(request.data);
                                    if (request.data) {
                                        dispatch({ type: "ADD_COMPONENT", components: [] });
                                        dispatch({ type: "CURRENT_PAGE", currentPage: request.data });
                                        LoadPage();
                                    }
                                    setNewPage(value);
                                })();
                            }} /> : <a target='_blanc' href={`https://www.malimda.com/${newPage}`}>www.malimda.com/{newPage}</a>}
                        </div>
                    </div>
                    <div className='devices'>
                        <div className='btn' onClick={() => handleBreaksite(100, "desktop")}>
                            <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_195_1207)">
                                    {state?.devices == "desktop" && <rect x="0.283447" width="44" height="44" rx="5.5" fill="#504F50" />}
                                    <path d="M10.0437 11H33.9121C34.3278 11 34.7055 11.1627 34.979 11.4247C35.2525 11.6867 35.4223 12.0485 35.4223 12.4467V27.93C35.4223 28.3282 35.2525 28.69 34.979 28.952C34.7055 29.214 34.3278 29.3767 33.9121 29.3767H24.8231C24.8667 29.7203 24.9606 30.0757 25.114 30.4144C25.2582 30.7319 25.4553 31.0347 25.7124 31.2982H26.7982C27.043 31.2982 27.2652 31.3941 27.4258 31.5479C27.5864 31.7018 27.6865 31.9146 27.6865 32.1491V32.7051C27.6865 32.8678 27.5485 33 27.3786 33H16.5772C16.4073 33 16.2693 32.8678 16.2693 32.7051V32.1491C16.2693 31.9146 16.3693 31.7018 16.53 31.5479C16.6906 31.3941 16.9128 31.2982 17.1576 31.2982H18.2434C18.501 31.0347 18.6981 30.7319 18.8417 30.4144C18.9952 30.0757 19.0891 29.7208 19.1327 29.3767H10.0437C9.62801 29.3767 9.25033 29.214 8.97681 28.952C8.7033 28.69 8.53345 28.3282 8.53345 27.93V12.4467C8.53345 12.0485 8.7033 11.6867 8.97681 11.4247C9.25033 11.1627 9.62801 11 10.0437 11ZM25.1782 31.2987C24.9991 31.0711 24.8539 30.8253 24.7384 30.5717C24.5614 30.1819 24.4562 29.7719 24.4105 29.3777H19.5448C19.4996 29.7719 19.3944 30.1819 19.2174 30.5717C19.1019 30.8253 18.9567 31.0711 18.7776 31.2987H25.1782ZM26.7982 31.8886H17.1576C17.0831 31.8886 17.0149 31.9181 16.9656 31.9653C16.9164 32.0124 16.8856 32.0778 16.8856 32.1491V32.4101H27.0712V32.1491C27.0712 32.0778 27.0404 32.0124 26.9912 31.9653C26.9419 31.9181 26.8737 31.8886 26.7993 31.8886H26.7987H26.7982ZM21.9776 26.8746C22.1988 26.8746 22.4 26.9606 22.5452 27.1002H22.5457C22.6909 27.2403 22.7812 27.432 22.7812 27.6444C22.7812 27.8568 22.6914 28.049 22.5457 28.1886L22.5365 28.1964C22.3918 28.3306 22.1947 28.4137 21.9776 28.4137C21.7606 28.4137 21.5553 28.3277 21.4101 28.1881H21.4096C21.2638 28.0485 21.174 27.8563 21.174 27.6439C21.174 27.4315 21.2638 27.2393 21.4096 27.1002H21.4101C21.5558 26.9606 21.7565 26.8741 21.9776 26.8741V26.8746ZM22.3286 27.3082C22.2388 27.2226 22.1152 27.1695 21.9776 27.1695C21.8401 27.1695 21.7164 27.2226 21.6266 27.3082C21.5373 27.3942 21.4819 27.5127 21.4819 27.6444C21.4819 27.7761 21.5373 27.8941 21.6271 27.9801C21.717 28.0662 21.8406 28.1193 21.9781 28.1193C22.1157 28.1193 22.2327 28.0691 22.322 27.987L22.3281 27.9801C22.4179 27.8941 22.4733 27.7756 22.4733 27.6444C22.4733 27.5132 22.4179 27.3942 22.3286 27.3082ZM9.99286 12.2732H34.1682V26.1028H9.7876V12.2732H9.99286ZM33.7577 12.6664H10.1981V25.7096H33.7577V12.6664ZM33.9121 11.5899H10.0432C9.79735 11.5899 9.57413 11.6862 9.41146 11.8416C9.2493 11.9969 9.14872 12.2112 9.14872 12.4467V27.93C9.14872 28.1655 9.2493 28.3793 9.41146 28.5351C9.57362 28.6904 9.79735 28.7868 10.0432 28.7868H33.9116C34.1574 28.7868 34.3806 28.6904 34.5433 28.5351C34.7055 28.3798 34.806 28.1655 34.806 27.93V12.4472C34.806 12.2117 34.7055 11.9974 34.5433 11.8421C34.3811 11.6867 34.1574 11.5904 33.9116 11.5904L33.9121 11.5899Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_195_1207">
                                        <rect x="0.283447" width="44" height="44" rx="11" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className='btn' onClick={() => handleBreaksite(100 * (2 / 3), "tablette")}>
                            <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_195_1210)">
                                    {state?.devices == "tablette" && <rect x="0.283447" width="44" height="44" rx="5.5" fill="#504F50" />}
                                    <path d="M29.4178 33H14.9912C14.4743 33 14.0536 32.5796 14.0536 32.0624V11.9376C14.0536 11.4204 14.4739 11 14.9912 11H29.4182C29.935 11 30.3558 11.4204 30.3558 11.9376V32.0628C30.3558 32.5796 29.935 33 29.4182 33H29.4178ZM14.9912 11.8036C14.9174 11.8036 14.8572 11.8638 14.8572 11.9376V32.0628C14.8572 32.1366 14.9174 32.1968 14.9912 32.1968H29.4182C29.492 32.1968 29.5522 32.1366 29.5522 32.0628V11.9376C29.5522 11.8638 29.492 11.8036 29.4182 11.8036H14.9912Z" fill="white" />
                                    <path d="M22.9766 30.8821C22.9766 31.2903 22.6458 31.6207 22.2376 31.6207C21.8295 31.6207 21.4991 31.2903 21.4991 30.8821C21.4991 30.474 21.8299 30.1436 22.2376 30.1436C22.6453 30.1436 22.9766 30.474 22.9766 30.8821Z" fill="white" />
                                    <path d="M28.2195 29.6389H16.1889C16.041 29.6389 15.9209 29.5193 15.9209 29.3709V13.0939C15.9209 12.946 16.041 12.8259 16.1889 12.8259H28.2195C28.3675 12.8259 28.4876 12.946 28.4876 13.0939V29.3713C28.4876 29.5193 28.368 29.6393 28.2195 29.6393V29.6389ZM16.457 29.1033H27.952V13.3615H16.457V29.1033Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_195_1210">
                                        <rect x="0.303551" width="44" height="44" rx="11" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className='btn' onClick={() => handleBreaksite(100 * (1 / 3), "mobile")}>
                            <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_195_1216)">
                                    {state?.devices == "mobile" && <rect x="0.283447" width="44" height="44" rx="5.5" fill="#504F50" />}
                                    <path d="M17.8145 11H25.9157C26.5665 11 27.1584 11.2653 27.587 11.6936C28.0157 12.1218 28.282 12.7117 28.282 13.3616V30.6384C28.282 31.2883 28.0161 31.8786 27.587 32.3064C27.1584 32.7342 26.5669 33 25.9157 33H17.8145C17.1637 33 16.5718 32.7347 16.1432 32.3064C15.7145 31.8782 15.4487 31.2879 15.4487 30.638V13.3611C15.4487 12.7117 15.7145 12.1214 16.1436 11.6931C16.5727 11.2649 17.1637 11 17.8145 11ZM17.0426 14.1231H26.6881C26.781 14.1231 26.8563 14.1983 26.8563 14.2911V29.7077C26.8563 29.8005 26.781 29.8756 26.6881 29.8756H17.0426C16.9496 29.8756 16.8743 29.8005 16.8743 29.7077V14.2911C16.8743 14.1983 16.9496 14.1231 17.0426 14.1231ZM26.5198 14.459H17.2108V29.5397H26.5198V14.459ZM21.8655 30.3928C22.0935 30.3928 22.3001 30.4852 22.4494 30.6343C22.5988 30.7833 22.6913 30.9894 22.6913 31.217C22.6913 31.4445 22.5988 31.6507 22.4494 31.7997C22.3001 31.9487 22.0935 32.0411 21.8655 32.0411C21.6375 32.0411 21.431 31.9487 21.2816 31.7997C21.1323 31.6507 21.0398 31.4445 21.0398 31.217C21.0398 30.9894 21.1323 30.7833 21.2816 30.6343C21.431 30.4852 21.6375 30.3928 21.8655 30.3928ZM22.2711 30.8123C22.1676 30.709 22.0237 30.6447 21.8655 30.6447C21.7074 30.6447 21.5635 30.709 21.46 30.8123C21.3561 30.916 21.2922 31.0591 21.2922 31.217C21.2922 31.3748 21.3565 31.5184 21.46 31.6217C21.5635 31.725 21.7074 31.7892 21.8655 31.7892C22.0237 31.7892 22.1676 31.725 22.2711 31.6217C22.375 31.518 22.4389 31.3748 22.4389 31.217C22.4389 31.0591 22.3745 30.9155 22.2711 30.8123ZM20.3503 13.0446C20.2573 13.0446 20.182 12.9694 20.182 12.8766C20.182 12.7839 20.2573 12.7087 20.3503 12.7087H20.4092C20.5021 12.7087 20.5774 12.7839 20.5774 12.8766C20.5774 12.9694 20.5021 13.0446 20.4092 13.0446H20.3503ZM21.497 13.0446C21.4041 13.0446 21.3288 12.9694 21.3288 12.8766C21.3288 12.7839 21.4041 12.7087 21.497 12.7087H23.3808C23.4737 12.7087 23.549 12.7839 23.549 12.8766C23.549 12.9694 23.4737 13.0446 23.3808 13.0446H21.497ZM25.9161 11.5038H17.8149C17.3034 11.5038 16.8381 11.7129 16.5007 12.0496C16.1634 12.3863 15.9539 12.8506 15.9539 13.3611V30.638C15.9539 31.1485 16.1634 31.6129 16.5007 31.9496C16.8381 32.2863 17.3034 32.4954 17.8149 32.4954H25.9161C26.4277 32.4954 26.8929 32.2863 27.2303 31.9496C27.5677 31.6129 27.7772 31.1485 27.7772 30.638V13.3611C27.7772 12.8506 27.5677 12.3863 27.2303 12.0496C26.8929 11.7129 26.4277 11.5038 25.9161 11.5038Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_195_1216">
                                        <rect x="0.323654" width="44" height="44" rx="11" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className='publication'>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31 29.0627V18.362C31 18.0664 30.8818 17.7818 30.671 17.5729C30.4609 17.3632 30.1748 17.2457 29.8777 17.2457H16.8345L18.3439 15.783C18.5588 15.4964 18.6217 15.1252 18.5153 14.7843C18.4081 14.4434 18.1441 14.1739 17.8041 14.0591C17.4641 13.9443 17.0895 13.9986 16.7965 14.2049L13.3133 17.5536C13.2145 17.6533 13.1357 17.7708 13.0811 17.9001V17.9771C13.0369 18.0877 13.0106 18.2046 13.0037 18.3235C12.9775 18.6369 13.0908 18.9469 13.3133 19.1703L16.7965 22.6346C17.0819 22.9054 17.4897 23.0064 17.8698 22.9019C18.2499 22.7975 18.5471 22.5019 18.6521 22.1239C18.7571 21.7458 18.6549 21.341 18.3833 21.0564L16.7191 19.4013H28.7553V27.9849H14.0487C13.7031 28.0495 13.408 28.2716 13.2511 28.585C13.0943 28.8977 13.0943 29.2662 13.2511 29.5789C13.408 29.8916 13.7031 30.1144 14.0487 30.179H29.8777C30.1755 30.179 30.4609 30.0614 30.671 29.8518C30.8818 29.6428 31 29.3583 31 29.0627Z" fill="white" />
                        </svg>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 29.0627V18.362C13 18.0664 13.1182 17.7818 13.329 17.5729C13.5391 17.3632 13.8252 17.2457 14.1223 17.2457H27.1655L25.6561 15.783C25.4412 15.4964 25.3783 15.1252 25.4847 14.7843C25.5919 14.4434 25.8559 14.1739 26.1959 14.0591C26.5359 13.9443 26.9105 13.9986 27.2035 14.2049L30.6867 17.5536C30.7855 17.6533 30.8643 17.7708 30.9189 17.9001V17.9771C30.9631 18.0877 30.9894 18.2046 30.9963 18.3235C31.0225 18.6369 30.9092 18.9469 30.6867 19.1703L27.2035 22.6346C26.9181 22.9054 26.5103 23.0064 26.1302 22.9019C25.7501 22.7975 25.4529 22.5019 25.3479 22.1239C25.2429 21.7458 25.3451 21.341 25.6167 21.0564L27.2809 19.4013H15.2447V27.9849H29.9513C30.2969 28.0495 30.592 28.2716 30.7489 28.585C30.9057 28.8977 30.9057 29.2662 30.7489 29.5789C30.592 29.8916 30.2969 30.1144 29.9513 30.179H14.1223C13.8245 30.179 13.5391 30.0614 13.329 29.8518C13.1182 29.6428 13 29.3583 13 29.0627Z" fill="white" />
                        </svg>
                        <div className='publication_btn' onClick={e => {
                            let html = '';
                            const sheet = new ServerStyleSheet();
                            const render = renderToStaticMarkup(sheet.collectStyles(<View data={state?.components} Libs={Libs} type="content" />));
                            const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
                            const test = sheet.getStyleElement();
                            const regex = /\/\*.*\*\/n/gm;
                            console.log(test, styleTags);
                            html = styleTags.replaceAll(regex, '') + render;
                            function remplaçant(clé, valeur) {
                                if (typeof valeur === 'string') {
                                    return valeur.replaceAll(/"/g, "'").replaceAll('/*!sc*/\n', "");
                                }
                                return valeur;
                            }
                            (async () => {
                                const { components, currentPage } = state;
                                const response = await axios.post(RequestUrl.post.save_page, {
                                    ID: state?.currentPage,
                                    post_content: JSON.stringify({ components, html: html }, remplaçant),
                                });
                                const { data } = response;
                                console.log(response);
                                if (data && response.status == 200) {
                                    LoadPage();
                                    dispatch({ type: 'SET_HTML', html });
                                    dispatch({ type: "publish", publish: data.ID });
                                }
                            })();
                        }}>Publication</div>
                    </div>
                </Header>

                <BodyEditor>
                    <div className='hiddenSlider'>
                        <svg onClick={
                            () => {
                                const components = state?.components;
                                components.push({
                                    id: uuid(),
                                    name: "Line",
                                    parent: null,
                                    children: []
                                });
                                dispatch({
                                    type: 'ADD_COMPONENT'
                                    , components
                                });
                            }
                        } width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_195_3581)">
                                <rect width="44" height="44" rx="5.5" fill="#504F50" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 22.5C12 21.6716 12.7462 21 13.6667 21H30.3333C31.2538 21 32 21.6716 32 22.5C32 23.3284 31.2538 24 30.3333 24H13.6667C12.7462 24 12 23.3284 12 22.5Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M22.5 12C23.3284 12 24 12.7462 24 13.6667L24 30.3333C24 31.2538 23.3284 32 22.5 32C21.6716 32 21 31.2538 21 30.3333L21 13.6667C21 12.7462 21.6716 12 22.5 12Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_195_3581">
                                    <rect width="44" height="44" rx="11" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="left">
                        <div id="sidebar">
                            <View Libs={Libs} data={test} setting={true} type="setting" />

                            <button onClick={e => {
                                window.localStorage.clear()
                            }}> Remove Storage </button>
                        </div>
                    </div>
                    <div className="center">
                       <View Libs={Libs} data={test}/>
                    </div>
                    <div className="right">
                        <div id='setting'>
                        </div>
                    </div>
                </BodyEditor>
            </div>
        </Fragment>
    );
};

export default Editor;