import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../datamanager/context';
import TestCard from "../../components/Testcard";


import axios from "axios";
import Search from "./Search";
import {ActionTypes, DataType, Site, Test, TestStatus, TestType} from '../../@types';

import "./styles.scss";

const Dashboard = () => {
    const { dispatch, state } = useContext(AppContext);
    const [ searchValue , setSearchValue] = useState('');

    useEffect(() => {

        let sitesUrl = `http://45.84.0.9:89/sites`;
        let testsUrl = `http://45.84.0.9:89/tests`;

        const requestSite = axios.get(sitesUrl);
        const requestTests = axios.get(testsUrl);

        dispatch({
            type: ActionTypes.LOADING_DATA,
            payload: true
        })

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
                return {
                    id,
                    name,
                    status,
                    type,
                    site: getSiteName()
                }
            })

            dispatch({
                type: ActionTypes.ADD_DATA,
                payload: data
            })

            dispatch({
                type: ActionTypes.LOADING_DATA,
                payload: false
            })

        })).catch(errors => {
            dispatch({
                type: ActionTypes.ERROR_DATA,
                payload: true
            })
        })

    }, [dispatch])

    return (
        <div className="screen dashboard">
            <h1 className="screen__title">Dashboard</h1>
            {JSON.stringify(state)}
            <div className="screen__content">
                <Search searchValue={searchValue} onSearch={setSearchValue}/>
                <TestCard data={{id: 6, name: 'asa', site: 'sdasd', status: 'ONLINE' as TestStatus.ONLINE, type: 'SERVER_SIDE' as TestType.SERVER_SIDE}}/>

            </div>
        </div>
    )
}

export default Dashboard;