import React from 'react';
import styles from '../css/HeaderIcon.css';

type Props = {
  +up: boolean
};

export default (props: Props) => (
  <svg
    className={`${styles.headerIcon} ${
      props.up ? styles.iconUp : styles.iconDown
    }`}
    enableBackground="new 0 0 32 32"
    height="100%"
    version="1.1"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.714,11.297c-0.389-0.389-1.039-0.389-1.429,0l-8.999,8.976  c-0.394,0.394-0.394,1.033,0,1.426c0.394,0.394,1.034,0.394,1.428,0L16,13.436l8.285,8.264c0.395,0.394,1.034,0.394,1.429,0  c0.394-0.394,0.394-1.033,0-1.426L16.714,11.297z"
      fill="#121313"
    />
  </svg>
);
