// @flow
import { remote } from 'electron';
import React from 'react';
import Textarea from 'react-textarea-autosize';
import ContentEditable from '../tools/ContentEditableExpanded';
import styles from '../css/PayloadData.css';
import { payloadType } from '../../reducers/payloads';
import CopyIcon from '../../assets/icons/CopyIcon';
import DeleteIcon from '../../assets/icons/DeleteIcon';

type Props = {
  +addItemData: (
    id: string,
    title: string,
    description: string,
    content: string
  ) => void,
  +renameItem: (id: string, title: string) => void,
  +removeItemData: (id: string, itemId: string) => void,
  +doNotShowDeleteConfirmation: () => void,
  +payloadData: payloadType,
  +showDeleteConfirmation: boolean
};

class PayloadData extends React.PureComponent<Props> {
  props: Props;

  state = {
    title: '',
    description: '',
    content: '',
    disabled: true,
    value: ''
  };

  removePayloadMessage = id => {
    const { dialog } = remote;

    if (this.props.showDeleteConfirmation) {
      dialog.showMessageBox(
        {
          type: 'warning',
          title: 'Delete record',
          message: 'Are you sure you want to delete this record?',
          checkboxLabel: 'Do not show this message again',
          buttons: ['Yes', 'No']
        },
        (response, checkbox) => {
          if (response === 0) {
            this.props.removeItemData(this.props.payloadData.id, id);
          }
          if (checkbox) {
            this.props.doNotShowDeleteConfirmation();
          }
        }
      );
    } else {
      this.props.removeItemData(this.props.payloadData.id, id);
    }
  };

  updateDataTitle = e => {
    this.setState({ title: e.target.value });
  };

  updateDataDescription = e => {
    this.setState({ description: e.target.value });
  };

  updateDataContent = e => {
    this.setState({ content: e.target.value });
  };

  handleChange = e => {
    this.props.renameItem(this.props.payloadData.id, e.target.value);
  };

  handleAdd = () => {
    const { title, description, content } = this.state;

    this.props.addItemData(
      this.props.payloadData.id,
      title,
      description,
      content
    );

    this.clearInputValues();
  };

  renameItem = event => {
    if (this.state.disabled) {
      const { target } = event;

      this.setState({ disabled: false, value: this.props.payloadData.title });

      setTimeout(() => {
        target.focus();
        if (
          typeof window.getSelection !== 'undefined' &&
          typeof document.createRange !== 'undefined'
        ) {
          const range = document.createRange();
          range.selectNodeContents(target);
          range.collapse(false);

          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 0);
    }
  };

  onBlur = () => {
    if (this.props.payloadData.title) {
      this.setState({ value: this.props.payloadData.title });
    } else {
      this.props.renameItem(this.props.payloadData.id, this.state.value);
    }

    this.setState({ disabled: true });
  };

  clearInputValues = () => {
    this.setState({ title: '', description: '', content: '' });
  };

  render() {
    const { payloadData } = this.props;

    const payloadDataBlock = payloadData.data.map(p => (
      <div key={p.id} className={styles.payloadDataBlock}>
        <span className={styles.payloadDataBlockTitle}>{p.title}</span>
        {p.description !== '' && (
          <span className={styles.payloadDataBlockDescription}>
            {p.description}
          </span>
        )}
        <div className={styles.payloadDataBlockBody}>
          <Textarea readOnly="readonly" value={p.content} />
          <div className={styles.icons}>
            <DeleteIcon onClick={() => this.removePayloadMessage(p.id)} />
            <CopyIcon content={p.content} />
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.payloadData}>
        <div className={styles.payloadDataHeader}>
          <ContentEditable
            id={payloadData.id}
            disabled={this.state.disabled}
            onClick={this.renameItem}
            onBlur={this.onBlur}
            onChange={this.handleChange}
            tagName="span"
            html={payloadData.title}
          />
        </div>
        <div className={styles.payloadDataBody}>
          {payloadDataBlock}

          <div className={styles.addPayloadBlock}>
            <p>Add New Payload</p>
            <input
              type="text"
              value={this.state.title}
              onChange={this.updateDataTitle}
              id={styles.addPayloadTitle}
              placeholder="Payload Title"
            />
            <input
              type="text"
              value={this.state.description}
              onChange={this.updateDataDescription}
              id={styles.addPayloadDescription}
              placeholder="Description (optional)"
            />
            <Textarea
              value={this.state.content}
              onChange={this.updateDataContent}
              id={styles.addPayloadBody}
              placeholder="Paste the payload here"
            />
            <div
              className={styles.addPayloadButton}
              onClick={this.handleAdd}
              onKeyPress={this.handleAdd}
              role="button"
              tabIndex={0}
            >
              Add
            </div>
            <div
              className={styles.cancelPayloadButton}
              onClick={this.clearInputValues}
              onKeyPress={this.clearInputValues}
              role="button"
              tabIndex={0}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayloadData;
