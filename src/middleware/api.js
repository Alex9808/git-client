
export default api => ({dispatch, getState}) => next => action => {
    if(typeof action === 'function') return action(dispatch, getState);
    const {request, type, ...rest} = action;
    let actionPromise;
    if(!request) return next(action);

    next({...rest, type: `${type}_PENDING`});

    actionPromise = Array.isArray(request)?
        Promise.all(request.map(item => api[item.op](item.path, {data: request.data, type: request.type, headers: request.headers}))) :
        api[request.op] (request.path, {data: request.data, type: request.type, headers: request.headers});

    actionPromise.then(
        result => {
            return next({...rest, result, type: `${type}_SUCCESS`});
        },
        error => {
            next({...rest, error, type: `${type}_FAIL`})
        }
    )
    return actionPromise;
}

