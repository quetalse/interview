import React, {createContext, useReducer} from 'react';
import { mainReducer, appActions } from './reducer';

import {DataType} from '../@types';

export const appState = {
    data: [] as DataType[] | [],
    search: '' as string | '',
    searchCount: null as number | null,
    loading: false as boolean | false,
    error: false as boolean | false
};

const AppContext = createContext<{
    state: typeof appState,
    dispatch: React.Dispatch<appActions>
}> ({
    state: appState,
    dispatch: () => null
})

const AppProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(mainReducer, appState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider};