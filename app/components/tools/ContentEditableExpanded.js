import React from 'react';
import ContentEditable from 'react-contenteditable';

type Props = {
  +id: string,
  +html: string,
  +className: string | undefined,
  disabled?: boolean,
  onClick?: () => void
};

export default class ContentEditableExpanded extends React.Component<Props> {
  shouldComponentUpdate = nextProps =>
    (this.props.disabled === true && this.props.html !== nextProps.html) ||
    this.props.className !== nextProps.className ||
    this.props.id !== nextProps.id ||
    this.props.disabled !== nextProps.disabled;

  onKeyPress = event => {
    if (event.charCode === 13) {
      event.target.blur();
      event.preventDefault();

      if (this.props.onClick.length === 0) {
        this.props.onClick();
      }
    }
  };

  handlePaste = e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };

  render() {
    return (
      <ContentEditable
        {...this.props}
        onKeyPress={this.onKeyPress}
        onPaste={this.handlePaste}
      />
    );
  }
}

ContentEditableExpanded.defaultProps = {
  disabled: false,
  onClick: () => {}
};
