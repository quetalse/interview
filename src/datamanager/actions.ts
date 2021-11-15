import React from "react";
import axios from "axios";

import { appActions } from "./reducer"
import {ActionTypes, DataType, Site, Test} from "../@types";

export const setLoading = (loading: boolean): appActions => ({
    type: ActionTypes.LOADING_DATA,
    payload: loading
})

export const setError = (error: boolean): appActions => ({
    type: ActionTypes.ERROR_DATA,
    payload: error
})

export const addSearch = (dispatch: React.Dispatch<appActions>, text: string) => {
    dispatch({
        type: ActionTypes.SEARCH_TEXT,
        payload: text
    });
}

export const addSearchCount = (dispatch: React.Dispatch<appActions>, count: number) => {
    dispatch({
        type: ActionTypes.SEARCH_COUNT,
        payload: count
    });
}



export const addData = (data: DataType[]): appActions => ({
    type: ActionTypes.ADD_DATA,
    payload: data
})

export const getAllData = (dispatch: React.Dispatch<appActions>) => {

    let sitesUrl = `http://45.84.0.9:89/sites`;
    let testsUrl = `http://45.84.0.9:89/tests`;

    const requestSite = axios.get(sitesUrl);
    const requestTests = axios.get(testsUrl);

    dispatch(setError(false));
    dispatch(setLoading(true));

    axios.all([requestSite, requestTests]).then(axios.spread((...responses) => {

        const responseSite: Site[] = responses[0].data
        const responseTest: Test[] = responses[1].data

        let data: DataType[] = responseTest.map(({id, name, status, type, siteId}) => {
            let getSiteName = () => {
                let url = responseSite.find(site => site.id === siteId)?.url || '';
                let host = new URL(url).host;
                let matchWww = host.match(/^www\.(.*)/);
                return matchWww ? matchWww[1] : host
            }
            return {id, name, status, type, site: getSiteName()}
        })

        dispatch(addData(data))
        dispatch(setLoading(false));

    })).catch(() => {
        dispatch(setError(true));
    })
}