import React from 'react';
import styles from '../css/ChecklistIcon.css';

export default () => (
  <svg
    className={styles.checklistListIcon}
    width="13px"
    height="14px"
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g strokeWidth="1" fill="none" fillRule="evenodd" strokeLinejoin="round">
      <g transform="translate(1.000000, 0.000000)" strokeWidth="2">
        <polygon points="24 3 0 3 0 15 24 15 30 9" />
        <path d="M13,0 L13,3" />
        <path d="M13,15 L13,32" />
      </g>
    </g>
  </svg>
);
