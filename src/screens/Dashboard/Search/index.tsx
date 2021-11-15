import React, {useContext} from 'react';

import search from '../../../assets/Vector.png';
import { addSearch } from '../../../datamanager/actions';
import { AppContext } from '../../../datamanager/context';

import "./styles.scss";

const Search = () => {
    const { state, dispatch } = useContext(AppContext);
    let testLength = state.data.length;

    return (
        <div className="search-box">
            <img src={search} alt="search" className="search-box__pic"/>
            <input
                className="search-box__input"
                type="text"
                placeholder="What test are you looking for?"
                value={state.search}
                onChange={(e: React.FormEvent<HTMLInputElement>) => addSearch(dispatch, e.currentTarget.value)}/>
            {testLength ? <span className="search-box__info">{state.data.length} tests</span> : null}
        </div>
    )
}

export default Search;