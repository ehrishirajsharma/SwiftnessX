import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';
import RootExport from './containers/RootExport';
import { configureStore } from './store/configureStore';
import './export.global.css';

const initialState = getInitialStateRenderer();
const store = configureStore(initialState, 'renderer');

render(
  <AppContainer>
    <RootExport store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRootExport = require('./containers/RootExport'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRootExport store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
