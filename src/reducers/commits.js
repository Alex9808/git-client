import {FETCH_BRANCH, FETCH_COMMIT} from "../constants/ActionTypes";

const initialState = {
    branch: {
        commits: [],
        branchName: '',
        loading: false,
        loaded: false,
        error: null
    },
    commit: {
        commitSha: '',
        author: {name: '', email: ''},
        date: '',
        message: '',
        tree: [],
        loading: false,
        loaded: false,
        error: null,
    }
}

export default function commits(state = initialState, action = {}) {
    switch (action.type) {
        case `${FETCH_BRANCH}_PENDING`:
            return {
                ...state,
                branch: {
                    ...state.branch,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        case `${FETCH_COMMIT}_PENDING`:
            return {
                ...state,
                commit: {
                    ...state.commit,
                    loading: true,
                    loaded: false,
                    error: null
                }
            }
        case `${FETCH_BRANCH}_SUCCESS`:
            return {
                ...state,
                branch: {
                    commits: action.result.commits,
                    branchName: action.result.name,
                    loading: false,
                    loaded: true,
                    error: null,
                }
            }
        case `${FETCH_COMMIT}_SUCCESS`:
            return {
                ...state,
                commit: {
                    commitSha: action.result.commit,
                    author: action.result.author,
                    date: action.result.date,
                    message: action.result.message,
                    tree: action.result.tree,
                    loading: false,
                    loaded: true,
                    error: null
                }
            }
        case `${FETCH_BRANCH}_FAIL`:
            return {
                ...state,
                branch: {
                    ...state.branch,
                    loading: false,
                    loaded: false,
                    error: action.error
                }
            }
        case `${FETCH_COMMIT}_FAIL`:
            return {
                ...state,
                commit: {
                    ...state.commit,
                    loading: false,
                    loaded: false,
                    error: action.error
                }
            }
        default:
            return state;
    }
}

