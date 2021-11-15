import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../datamanager/context';
import TestCard from "../../components/Testcard";

import "./styles.scss";
import Search from "./Search";
import {TestStatus, TestType} from '../../@types';

const Dashboard = () => {
    const { dispatch, state } = useContext(AppContext);
    const [ searchValue , setSearchValue] = useState('');

    return (
        <div className="screen dashboard">
            <h1 className="screen__title">Dashboard</h1>
            <div className="screen__content">
                <Search searchValue={searchValue} onSearch={setSearchValue}/>
                <TestCard data={{id: 6, name: 'asa', site: 'sdasd', status: 'ONLINE' as TestStatus.ONLINE, type: 'SERVER_SIDE' as TestType.SERVER_SIDE}}/>

            </div>
        </div>
    )
}

export default Dashboard;