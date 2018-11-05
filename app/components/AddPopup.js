// @flow
import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { libraryType } from '../reducers/libraries';
import styles from './css/AddPopup.css';

type Props = {
  +onClick: (e, library?: libraryType) => void,
  +onClose: () => void,
  +libraries: libraryType[]
};

class AddPopup extends React.PureComponent<Props> {
  props: Props;

  handleClickOutside = e => {
    e.stopPropagation();
    this.props.onClose();
  };

  render() {
    const { libraries } = this.props;

    return (
      <div className={styles.addPopup} id="add-popup">
        <ul>
          <li
            key="none"
            onClick={this.props.onClick}
            onKeyPress={this.props.onClick}
            role="menuitem"
          >
            None
          </li>
          {libraries.map(library => (
            <li
              key={library.id}
              onClick={e => this.props.onClick(e, library)}
              onKeyPress={e => this.props.onClick(e, library)}
              role="menuitem"
            >
              {library.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    libraries: state.libraries
  };
}

export default connect(mapStateToProps)(onClickOutside(AddPopup));
