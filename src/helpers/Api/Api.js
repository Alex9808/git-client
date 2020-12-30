import superagent from 'superagent';
import {settings} from '../../config';

const methods = ["get", "post", "put", "del", "patch"]

function formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? `/${path}` : path;
    return `${settings.apiPath}${adjustedPath}`;
}

export default class Api {
    constructor() {
        methods.forEach(method => {
            this[method] = (path, {params, data, type, headers = {}} = {}) =>
                new Promise((resolve, reject) => {
                    let request = superagent[method](formatUrl(path));
                    if(params) request.query(params);
                    request.set('Accept', 'application/json');
                    if(type) request.type(type);
                    Object.keys(headers).forEach(key => request.set(key, headers[key]));
                    if(data) request.send(data);
                    request.end(
                        (err, {body} = {}) => (err? reject(err) : resolve(body)),
                    )
                });
        });
    }
}