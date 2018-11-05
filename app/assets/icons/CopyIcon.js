import { clipboard } from 'electron';
import React from 'react';
import { toast } from 'react-toastify';
import sanitizeHtml from 'sanitize-html';
import styles from '../css/CopyIcon.css';

type Props = {
  +content: string,
  sanitizeContent?: boolean
};

let toastId = null;

const htmlDecode = input => {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
};

const handleCopy = (content, sanitizeContent) => {
  if (sanitizeContent) {
    const text = sanitizeHtml(content, {
      allowedTags: ['p'],
      allowedAttributes: []
    });

    clipboard.write({
      text: htmlDecode(text.replace(/<p>/g, '').replace(/<\/p>/g, '\n')),
      html: content
    });
  } else {
    clipboard.write({
      text: content
    });
  }

  notify();
};

const notify = () => {
  if (!toast.isActive(toastId)) {
    toastId = toast('Content copied to clipboard', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
      bodyClassName: styles.toastBody,
      progressClassName: styles.toastProgress
    });
  }
};

const CopyIcon = (props: Props) => (
  <svg
    className={styles.copyIcon}
    onClick={() => handleCopy(props.content, props.sanitizeContent)}
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(-1394.000000, -114.000000)" stroke="#909399">
        <g id="Group-Copy" transform="translate(1395.000000, 115.000000)">
          <rect x="6.3" y="6.3" width="11.7" height="11.7" rx="2" />
          <path d="M2.7,11.7 L1.8,11.7 C0.80588745,11.7 0,10.8941125 0,9.9 L0,1.8 C-1.99840144e-16,0.80588745 0.80588745,0 1.8,0 L9.9,0 C10.8941125,0 11.7,0.80588745 11.7,1.8 L11.7,2.7" />
        </g>
      </g>
    </g>
  </svg>
);

CopyIcon.defaultProps = {
  sanitizeContent: false
};

export default CopyIcon;
