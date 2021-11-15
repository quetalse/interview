import React, { useContext } from "react";
import {AppContext} from "../../datamanager/context";
import {addSearch} from "../../datamanager/actions";

import "./styles.scss";

const NoResult: React.FC = () => {

    const { dispatch } = useContext(AppContext);
    return (
        <div className="tests_no-result">
            <span className="title"> Your search did not match any results.</span>
            <div className="test-card__btn test-card__btn_results" onClick={() => addSearch(dispatch, '')}>Reset</div>
        </div>
    )
}

export default NoResult;