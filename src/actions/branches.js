import {FETCH_BRANCHES} from "../constants/ActionTypes";

export const fetchBranches = () => ({
   type: FETCH_BRANCHES,
   request: {
       op: 'get',
       path: '/api/branches'
   }
});