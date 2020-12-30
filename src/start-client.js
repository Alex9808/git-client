import {BrowserRouter} from "react-router-dom";
import React from "react";
import {hydrate} from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import {ReduxAsyncConnect} from "redux-connect";
import routes from './routes';
import {Api} from './helpers';
import {MuiThemeProvider} from '@material-ui/core';
import theme from './theme';

import configureStore from './store';

export default () => {
    const history = createBrowserHistory();
    const api = new Api();

    const store = configureStore(history,api);

    hydrate(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <ReduxAsyncConnect routes={routes}/>
                    </MuiThemeProvider>
                </BrowserRouter>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'),
    );
};