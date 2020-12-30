import { reducer as reduxAsyncConnect } from 'redux-connect';
import repo from "./repos";
import branches from "./branches";
const reducers = {
    reduxAsyncConnect,
    repo,
    branches
};
export default reducers;