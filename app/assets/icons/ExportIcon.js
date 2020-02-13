import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExportActions from '../../actions/export';
import styles from '../css/ExportIcon.css';

type Props = {
  onClick: () => void
};

const ExportIcon = (props: Props) => {
  const { onClick } = props;

  return (
    <svg
      className={styles.exportButton}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        fontFamily="material"
        fontSize="20"
        fontWeight="normal"
      >
        <g fill="#F97072">
          <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" />
        </g>
      </g>
    </svg>
  );
};

function mapStateToExportProps(state) {
  return {
    export: state.exportDialog
  };
}

function mapDispatchToExportProps(dispatch) {
  return bindActionCreators(ExportActions, dispatch);
}

export default connect(
  mapStateToExportProps,
  mapDispatchToExportProps
)(ExportIcon);
