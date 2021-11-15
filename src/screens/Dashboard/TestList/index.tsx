import TestCard from "../../../components/Testcard";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {AppContext} from "../../../datamanager/context";
import {DataType} from "../../../@types";

import "./styles.scss";
import {addSearch} from "../../../datamanager/actions";
import NoResult from "../../../components/NoResult";

const sortArray = (direction: any, array: any[], field: any) => {
    return [...array].sort((a, b): number => {
            if(direction === 'up'){
                return (a[field] > b[field]) ? 1 : -1
            }else{
                return (a[field] > b[field]) ? -1 : 1
            }
        }
    );
}

const UpDownArrow: React.FC<{state: string | null}> = ({state}) => {
    if(!state) return null
    if(state === 'up') return <span>&#8593;</span>
    return <span>&#8595;</span>
}

const TestList: React.FC = () => {

    const { state } = useContext(AppContext);

    const [ testList, setTestList] = useState<DataType[]>(state.data);

    const [ sortName, setSortName ] = useState<string | null>(null)
    const [ sortType, setSortType ] = useState<string | null>(null)
    const [ sortSite, setSortSite ] = useState<string | null>(null)

    useEffect(() => {
        setTestList(state.data)
    }, [state.data])

    useEffect(() => {
        let filtered = state.data.filter(test => {
            return test.name.toLowerCase().includes(state.search.toLowerCase());
        });
        setTestList(filtered)
    }, [state.search, state.data])

    useEffect(() => {
        if(sortName){
            // let sorted = sortArray(sortName, testList, 'name')
            //
            // setTestList(sorted)

            setSortType(null)
            setSortSite(null)
        }
    }, [sortName])

    useEffect(() => {
        if(sortType){
            // let sorted = sortArray(sortType, testList, 'type')
            //
            // setTestList(sorted)

            setSortName(null)
            setSortSite(null)
        }
    }, [sortType])

    useEffect(() => {
        if(sortSite){
            // let sorted = sortArray(sortSite, testList, 'site')
            // setTestList(sorted)

            setSortType(null)
            setSortName(null)
        }
    }, [sortSite])

    let testListCreator = (list: DataType[]) => {
        if(!list.length) return <NoResult/>
        return list.map(test => <TestCard key={test.id} data={test}/>)
    }

    let onSort = useCallback((field: string | null, setField: React.Dispatch<React.SetStateAction<string | null>>, title: string) => {
        return () => {
            if(!field) setField('up')
            if(field === 'up') setField('down')
            if(field === 'down') setField('up')

            let sorted = sortArray(field, testList, title)

            setTestList(sorted)
        }
    }, [testList])

    return (
        <div className="tests">
            {testList.length ?
                (<div className="tests__header">
                        <span className="test-name" onClick={onSort(sortName, setSortName, 'name')}>NAME <UpDownArrow state={sortName}/></span>
                        <span className="test-type" onClick={onSort(sortType, setSortType, 'type')}>TYPE <UpDownArrow state={sortType}/></span>
                        <span className="test-status">STATUS</span>
                        <span className="test-site" onClick={onSort(sortSite, setSortSite, 'site')}>SITE <UpDownArrow state={sortSite}/></span>
                    </div>
                ): null}
            {testListCreator(testList)}
        </div>
    )
}

export default TestList;