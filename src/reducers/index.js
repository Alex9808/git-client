import { reducer as reduxAsyncConnect } from 'redux-connect';
import repo from "./repos";
import branches from "./branches";
import commits from "./commits";
import prs from "./prs";
const reducers = {
    reduxAsyncConnect,
    repo,
    branches,
    commits,
    prs
};
export default reducers;