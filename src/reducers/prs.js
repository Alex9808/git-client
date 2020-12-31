import {FETCH_PR, LIST_PRS, CREATE_PR, UPDATE_PR_STATUS, MERGE_PR} from "../constants/ActionTypes";

const loadTemplate = {
    loading: false,
    loaded: false,
    error: null
}
const initialState = {
    pr: {},
    prs: [],

    fetch: loadTemplate,
    list: loadTemplate,
    create: loadTemplate,
    update: loadTemplate,
    merge: loadTemplate,
}

function getRequestKey(actionType) {
    return actionType.split('_')[0].toLowerCase();
}

export default function prs(state = initialState, action = {}) {
    switch (action.type) {
        case `${FETCH_PR}_PENDING`:
        case `${LIST_PRS}_PENDING`:
        case `${CREATE_PR}_PENDING`:
        case `${UPDATE_PR_STATUS}_PENDING`:
        case `${MERGE_PR}_PENDING`:
            return {
                ...state,
                [getRequestKey(action.type)]: {
                    loading: true,
                    loaded: false,
                    error: null
                }
            }

        case `${FETCH_PR}_SUCCESS`:
            return {
                ...state,
                pr: action.result,
                [getRequestKey(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                }
            }
        case `${LIST_PRS}_SUCCESS`:
            return {
                ...state,
                prs: action.result,
                [getRequestKey(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                }
            }

        case `${CREATE_PR}_SUCCESS`:
        case `${UPDATE_PR_STATUS}_SUCCESS`:
        case `${MERGE_PR}_SUCCESS`:
            return {
                ...state,
                [getRequestKey(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                }
            }

        case `${FETCH_PR}_FAIL`:
        case `${LIST_PRS}_FAIL`:
        case `${CREATE_PR}_FAIL`:
        case `${UPDATE_PR_STATUS}_FAIL`:
        case `${MERGE_PR}_FAIL`:
            return {
                ...state,
                [getRequestKey(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error
                }
            }

        default:
            return state;

    }
}