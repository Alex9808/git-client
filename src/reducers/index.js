import { reducer as reduxAsyncConnect } from 'redux-connect';
import repo from "./repos";
import branches from "./branches";
import commits from "./commits";
const reducers = {
    reduxAsyncConnect,
    repo,
    branches,
    commits,
};
export default reducers;