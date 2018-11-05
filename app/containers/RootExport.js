// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ExportDialog from '../components/ExportDialog';

type Props = {
  store: {}
};

export default class RootExport extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ExportDialog />
      </Provider>
    );
  }
}
