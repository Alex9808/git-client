import {FETCH_BRANCHES} from "../constants/ActionTypes";

const initialState = {
    branches: [],
    loading: false,
    loaded: false,
    error: null
};

export default function branches(state = initialState, action = {}) {
    switch (action.type) {

        case `${FETCH_BRANCHES}_PENDING`:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null
            }
        case `${FETCH_BRANCHES}_SUCCESS`:
            return {
                ...state,
                branches: action.result,
                loading: false,
                loaded: true,
                error: null
            }
        case `${FETCH_BRANCHES}_FAIL`:
            return {
                ...state,
                branches: [],
                loading: false,
                loaded: false,
                error: action.error
            }
        default:
            return state;

    }
}