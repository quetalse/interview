import TestCard from "../../../components/Testcard";
// import "./styles.scss";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {AppContext} from "../../../datamanager/context";
import {DataType} from "../../../@types";

const TestList: React.FC<{searchValue: string, onSearch: any}> = ({searchValue, onSearch}) => {

    const { state } = useContext(AppContext);
    const [ testList, setTestList] = useState<DataType[]>(state.data);

    useEffect(() => {
        setTestList(state.data)
    }, [state.data])

    useEffect(() => {
        let filtered = state.data.filter(test => {
            return test.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setTestList(filtered)
    }, [searchValue, state.data])

    let testListCreator = (list: DataType[]) => {
        if(!list.length) return (
            <div className="tests_no-result">
                <span className="title"> Your search did not match any results.</span>
                <div className="test-card__btn test-card__btn_results" onClick={() => {onSearch('')}}>Reset</div>
            </div>
        )
        return list.map(test => <TestCard key={test.id} data={test}/>)
    }

    return (
        <div className="tests">
            {testListCreator(testList)}
        </div>
    )
}

export default TestList;