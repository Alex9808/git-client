import {FETCH_PR, LIST_PRS, CREATE_PR, UPDATE_PR_STATUS, MERGE_PR} from "../constants/ActionTypes";

export const fetchPr = (prId) => ({
    type: FETCH_PR,
    request: {
        op: 'get',
        path: '/api/prs/' + prId,
    }
});

export const listPrs = () => ({
    type: LIST_PRS,
    request: {
        op: 'get',
        path: '/api/prs'
    }
});

export const createPr = (data) => ({
    type: CREATE_PR,
    request: {
        op: 'post',
        path: '/api/prs',
        data,
    }
});

export const updatePrStatus = (prId, status) => ({
   type: UPDATE_PR_STATUS,
   request: {
       op: 'put',
       path: `/api/prs/${prId}/status`,
       data: {status}
   }
});

export const mergePr = (prId) => ({
    type: MERGE_PR,
    request: {
        op: 'put',
        path: `/api/prs/${prId}/merge`
    }
});

