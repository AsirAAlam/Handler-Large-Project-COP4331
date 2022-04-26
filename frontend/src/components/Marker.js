import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Box,
  Container,
  styled as stylesmui,
} from '@mui/material';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #003c80;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Wrapper2 = stylesmui((props) => <Box />)(
  ({ theme }) => ({
    // textTransform: 'none',
    // fontWeight: theme.typography.fontWeightRegular,
    // fontSize: theme.typography.pxToRem(15),
    // marginRight: theme.spacing(1),
    // color: 'steelblue',
    // // color: 'rgba(255, 255, 255, 0.7)',
    // '&.Mui-selected': {
    //   // color: '#fff',
    //   color: 'cyanblue',
    //   fontWeight: theme.typography.fontWeightBold,
    // },
    // '&.Mui-focusVisible': {
    //   backgroundColor: 'rgba(100, 95, 228, 0.32)',
    // },

    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '18px',
    height: '18px',
    backgroundColor: '#003c80',
    border: '2px solid #fff',
    borderRadius: '100%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    // cursor: ${(props) => (props.onClick ? 'pointer' : 'default')},
    '&:hover': {
      zIndex: 1,
    }
  }),
);

const Marker = ({ text, onClick }) => (
  <Wrapper
    alt={text}
    onClick={onClick}
  />
  // <Wrapper2
  //   alt={text}
  //   onClick={onClick}
  // />
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;