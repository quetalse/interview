import {appState} from "./context";
import {ActionTypes, DataType} from "../@types";

// export type appActions = {
//     type: ActionTypes.ADD_TESTS,
//     payload: Test[]
// } | {
//     type: ActionTypes.ADD_SITES,
//     payload: Site[]
// }

export type appActions = {
    type: ActionTypes.ADD_DATA,
    payload: DataType[]
} | {
    type: ActionTypes.LOADING_DATA,
    payload: boolean
} | {
    type: ActionTypes.ERROR_DATA,
    payload: boolean
}

export const mainReducer = (state: typeof appState, action: appActions) => {
    switch (action.type) {

        case ActionTypes.ADD_DATA:
            return {
                ...state,
                data: action.payload
            }

        case ActionTypes.LOADING_DATA:
            return {
                ...state,
                loading: action.payload
            }

        case ActionTypes.ERROR_DATA:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}