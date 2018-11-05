import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AboutActions from '../../actions/about';
import styles from '../css/SwiftnessIcon.css';

type Props = {
  onClick: () => void,
  openAbout: () => void
};

const SwiftnessIcon = (props: Props) => {
  const { openAbout, onClick } = props;

  return (
    <svg
      className={styles.swiftLogo}
      onClick={onClick}
      onKeyPress={openAbout}
      width="78px"
      height="14px"
      viewBox="0 0 78 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-21.000000, -983.000000)">
          <text>
            <tspan
              x="21"
              y="996"
              fontFamily="NunitoSans-Black, Nunito Sans"
              fontSize="17"
              fontWeight="700"
              letterSpacing="0.386363655"
              fill="#F97072"
            >
              sw
            </tspan>
            <tspan
              y="996"
              fontFamily="NunitoSans-Black, Nunito Sans"
              fontSize="17"
              fontWeight="700"
              letterSpacing="0.410511374"
              fill="#F9799A"
            >
              ift
            </tspan>
            <tspan
              y="996"
              fontFamily="NunitoSans-ExtraLight, Nunito Sans"
              fontSize="17"
              fontWeight="300"
              letterSpacing="0.410511374"
              fill="#FD8D68"
            >
              ness
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AboutActions, dispatch);
}

export default connect(null, mapDispatchToProps)(SwiftnessIcon);
