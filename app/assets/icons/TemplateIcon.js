import React from 'react';
import styles from '../css/TemplateIcon.css';

export default () => (
  <svg
    className={styles.templateIcon}
    width="14px"
    height="16px"
    viewBox="0 0 22 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(1.000000, 1.000000)" strokeWidth="2">
        <polygon id="Shape" points="10 0 0 5 10 10 20 5" />
        <polyline id="Shape" points="0 15 10 20 20 15" />
        <polyline id="Shape" points="0 10 10 15 20 10" />
      </g>
    </g>
  </svg>
);
