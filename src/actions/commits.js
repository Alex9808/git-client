import {FETCH_BRANCH, FETCH_COMMIT} from "../constants/ActionTypes";

export const fetchCommits = (ref) => ({
    type: FETCH_BRANCH,
    request: {
        op: 'get',
        path: `/api/commits?ref=${ref}`,
    }
});

export const fetchCommit = commit_id => ({
    type: FETCH_COMMIT,
    request: {
        op: 'get',
        path: `/api/commits/${commit_id}`
    }
});