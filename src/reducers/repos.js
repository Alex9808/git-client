import {FETCH_REPO, CLONE_REPO} from "../constants/ActionTypes";

const initialState = {
    name: '',
    url: '',
    fetch: {
        loading: false,
        loaded: false,
        error: null,
    },
    clone: {
        loading: false,
        loaded: false,
        error: null,
    }
};

function getRequestKey(actionType) {
    return actionType.split('_')[0].toLowerCase();
}

export default function repo(state = initialState, action = {}) {
    switch (action.type) {
        case `${FETCH_REPO}_PENDING`:
        case `${CLONE_REPO}_PENDING`:
            return {
                ...state,
                [getRequestKey(action.type)]: {
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        case `${FETCH_REPO}_SUCCESS`:
        case `${CLONE_REPO}_SUCCESS`:
            return {
                ...state,
                name: action.result.name,
                url: action.result.url,
                [getRequestKey(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                }
            }
        case `${FETCH_REPO}_FAIL`:
        case `${CLONE_REPO}_FAIL`:
            return {
                ...state,
                name: '',
                url: '',
                [getRequestKey(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error
                }
            }

        default: return state;
    }
}