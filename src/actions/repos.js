import {FETCH_REPO, CLONE_REPO, DELETE_REPO} from "../constants/ActionTypes";

export const fetchRepo = () => ({
    type: FETCH_REPO,
    request: {
        op: 'get',
        path: '/api/repo'
    }
});

export const cloneRepo = (url) => ({
    type: CLONE_REPO,
    request: {
        op: 'post',
        path: '/api/repo/clone',
        data: {repo_url: url}
    }
});

export const deleteRepo = () => ({
   type: DELETE_REPO,
   request: {
       op: 'del',
       path: '/api/repo'
   }
});