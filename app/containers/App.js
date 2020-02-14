// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class App extends React.PureComponent<Props> {
  props: Props;

  render() {
    return <div>{this.props.children}</div>;
  }
}
