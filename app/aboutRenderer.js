import React from 'react';
import { render } from 'react-dom';
import AboutDialog from './components/AboutDialog';

render(<AboutDialog />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(<AboutDialog />, document.getElementById('root'));
  });
}
