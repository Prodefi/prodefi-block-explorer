/* eslint import/no-webpack-loader-syntax:0 */
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createPlugin from 'bugsnag-react';
import * as cacheStore from 'store';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
  faCubes,
  faPaperPlane,
  faLock,
  faSearch,
  faDove,
  faGlobe,
  faMinusCircle,
  faPlusCircle,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import bugsnagClient from 'utils/bugsnag';
import socket from 'init/socket';

/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/favicon/favicon.png';

// Store
import { store } from './init/store';
import { history } from './init/middleware';

// import configureStore from './configureStore';

// Import CSS reset and Global Styles
import './assets/styles/globalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
  faCubes,
  faGlobe,
  faPaperPlane,
  faLock,
  faSearch,
  faDove,
  faMinusCircle,
  faPlusCircle,
  faSortDown,
  faSortUp
);

cacheStore.set('eosMonitor_currentLanguage', 'en');

// Create redux store with history
const MOUNT_NODE = document.getElementById('app');
const ErrorBoundary = bugsnagClient.use(createPlugin(React));

socket.init(store);

const render = () => {
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
