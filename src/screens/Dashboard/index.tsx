import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../datamanager/context';
import {ActionTypes, DataType, Site, Test} from '../../@types';

import "./styles.scss";
import Search from "./Search";

const Dashboard = () => {
    const { dispatch, state } = useContext(AppContext);
    const [ searchValue , setSearchValue] = useState('');

    return (
        <div className="screen dashboard">
            <h1 className="screen__title">Dashboard</h1>
            <div className="screen__content">
                <Search searchValue={searchValue} onSearch={setSearchValue}/>
            </div>
        </div>
    )
}

export default Dashboard;