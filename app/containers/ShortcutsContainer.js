// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import {
  addTarget,
  addTargetFolder,
  addTargetCheckitem,
  addTargetNote
} from '../actions/targets';
import { addLibraryFolder, addLibraryItem } from '../actions/libraries';
import { addTemplateItem } from '../actions/templates';
import { addPayloadItem } from '../actions/payloads';
import { uiStateType } from '../reducers/uiState';

type Props = {
  +addTarget: () => void,
  +addTargetFolder: (id: string) => void,
  +addTargetCheckitem: (id: string, folderId: string) => void,
  +addTargetNote: (id: string, folderId: string) => void,

  +addLibraryFolder: (id: string) => void,
  +addLibraryItem: (id: string, folderId: string) => void,

  +addTemplateItem: () => void,
  +addPayloadItem: () => void,

  +uiState: uiStateType
};

class ShortcutsContainer extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);

    Mousetrap.prototype.stopCallback = () => false;

    Mousetrap.bind(['command+f', 'ctrl+f'], () => {
      const { active } = this.props.uiState;

      if (active === 'menu') {
        document.getElementsByClassName('target-search')[0].focus();
      } else if (active === 'list') {
        document.getElementsByClassName('list-search')[0].focus();
      }
    });

    Mousetrap.bind(['command+t', 'ctrl+t'], () => {
      this.props.addTarget();
    });

    Mousetrap.bind(['command+n', 'ctrl+n'], () => {
      const { menu, main, active } = this.props.uiState;

      if (active === 'menu') {
        if (menu.type === 'target') {
          this.props.addTargetFolder(menu.id);
        } else if (menu.type === 'library') {
          this.props.addLibraryFolder(menu.id);
        }
      } else if (active === 'list') {
        if (main.type === 'checklistData') {
          this.props.addTargetCheckitem(menu.id, menu.folderId);
        } else if (main.type === 'noteData') {
          this.props.addTargetNote(menu.id, menu.folderId);
        } else if (main.type === 'libraryData') {
          this.props.addLibraryItem(menu.id, menu.folderId);
        } else if (main.type === 'templateData') {
          this.props.addTemplateItem();
        } else if (main.type === 'payloadData') {
          this.props.addPayloadItem();
        }
      }
    });

    Mousetrap.bind(['command+k', 'ctrl+k'], () => {
      document.querySelector('.ql-link').click();
    });

    Mousetrap.bind(['command+m', 'ctrl+l'], () => {
      document.querySelector('.ql-list[value="check"]').click();
    });
  }

  render() {
    return '';
  }
}

function mapStateToProps(state) {
  return {
    uiState: state.uiState,
    targets: state.targets,
    libraries: state.libraries,
    templates: state.templates,
    payloads: state.payloads
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addTarget,
      addTargetFolder,
      addTargetCheckitem,
      addTargetNote,

      addLibraryFolder,
      addLibraryItem,

      addTemplateItem,
      addPayloadItem
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortcutsContainer);
