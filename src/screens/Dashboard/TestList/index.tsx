import React, {useCallback, useContext, useEffect, useState} from "react";
import {AppContext} from "../../../datamanager/context";
import NoResult from "../../../components/NoResult";
import TestCard from "../../../components/Testcard";
import {DataType} from "../../../@types";

import "./styles.scss";

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

    const sortArray = useCallback((direction: any, array: DataType[], field: keyof DataType) => {
        return [...testList].sort((a, b): number => {
                if(direction === 'up'){
                    return (a[field] > b[field]) ? 1 : -1
                }else{
                    return (a[field] > b[field]) ? -1 : 1
                }
            }
        );
    }, [testList])

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
            let sorted = sortArray(sortName, testList, 'name')
            let isDifferent = false;

            sorted.forEach((value, index) => {
                if(value.name !== testList[index].name) isDifferent = true;
            })

            if (isDifferent) setTestList(sorted)

            setSortType(null)
            setSortSite(null)
        }
    }, [sortArray, testList, sortName])

    useEffect(() => {
        if(sortType){
            let sorted = sortArray(sortType, testList, 'type')
            let isDifferent = false;

            sorted.forEach((value, index) => {
                if(value.type !== testList[index].type) isDifferent = true;
            })

            if (isDifferent) setTestList(sorted)

            setSortName(null)
            setSortSite(null)
        }
    }, [sortArray, testList, sortType])

    useEffect(() => {
        if(sortSite){
            let sorted = sortArray(sortSite, testList, 'site')
            let isDifferent = false;

            sorted.forEach((value, index) => {
                if(value.site !== testList[index].site) isDifferent = true;
            })

            if (isDifferent) setTestList(sorted)

            setSortType(null)
            setSortName(null)
        }
    }, [sortArray, testList, sortSite])

    let testListCreator = (list: DataType[]) => {
        if(!list.length) return <NoResult/>
        return list.map(test => <TestCard key={test.id} data={test}/>)
    }

    let onSort = (field: string | null, setField: React.Dispatch<React.SetStateAction<string | null>>, title: string) => {
        return () => {
            if(!field) setField('up')
            if(field === 'up') setField('down')
            if(field === 'down') setField('up')
        }
    }

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