import React, {useContext} from 'react';

import search from '../../../assets/Vector.png';
import { AppContext } from '../../../datamanager/context';

import "./styles.scss";

const Search = ({onSearch, searchValue}: {
    onSearch: any,
    searchValue: string
}) => {
    const { state } = useContext(AppContext);
    let testLength = state.data.length;

    return (
        <div className="search-box">
            <img src={search} alt="search" className="search-box__pic"/>
            <input
                className="search-box__input"
                type="text"
                placeholder="What test are you looking for?"
                value={searchValue}
                onChange={(e: React.FormEvent<HTMLInputElement>) => onSearch(e.currentTarget.value)}/>
            {testLength ? <span className="search-box__info">{state.data.length} tests</span> : null}
        </div>
    )
}

export default Search;