import {useContext, useEffect} from 'react';
import {AppContext} from '../../datamanager/context';
import {getAllData} from "../../datamanager/actions";

import Search from "./Search";
import TestList from "./TestList";
import Loader from '../../components/Loader';


import "./styles.scss";

const Dashboard = () => {
    const { dispatch, state } = useContext(AppContext);

    useEffect(() => {
        if(!state.data.length) getAllData(dispatch)
    }, [dispatch, state.data])

    return (
        <div className="screen dashboard">
            <h1 className="screen__title">Dashboard</h1>
            <div className="screen__content">
                <Search/>
                { (state.loading || !state.data.length) ? <Loader/> : <TestList/> }
            </div>
        </div>
    )
}

export default Dashboard;