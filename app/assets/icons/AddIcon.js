import React from 'react';
import className from 'classnames';
import styles from '../css/AddIcon.css';

type Props = {
  onClick: () => void
};

export default (props: Props) => (
  <svg
    className={className(styles.headerAddIcon, 'ignore-react-onclickoutside')}
    onClick={props.onClick}
    width="17px"
    height="17px"
    viewBox="0 0 507 507"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#37404D" fillRule="nonzero">
        <path d="M253.108,0.02 C113.365,0.02 0.108,113.277 0.108,253.02 C0.108,392.763 113.365,506.015 253.108,506.015 C392.851,506.015 506.108,392.763 506.108,253.02 C506.108,113.277 392.852,0.02 253.108,0.02 Z M253.108,485.775 C124.77,485.775 20.348,381.358 20.348,253.02 C20.348,124.681 124.77,20.26 253.108,20.26 C381.446,20.26 485.868,124.681 485.868,253.02 C485.868,381.358 381.446,485.775 253.108,485.775 Z" />
        <polygon points="263.228 101.22 242.988 101.22 242.988 242.9 101.98 242.9 101.98 263.14 242.988 263.14 242.988 404.148 263.228 404.148 263.228 263.14 404.908 263.14 404.908 242.9 263.228 242.9" />
      </g>
    </g>
  </svg>
);
