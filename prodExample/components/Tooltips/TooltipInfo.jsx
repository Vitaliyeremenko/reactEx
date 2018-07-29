import React from 'react';
import {
  UncontrolledTooltip,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const TooltipInfo = ({ uniqueKey, info, placement, theme }) => {
  return (
    <div className={`tooltip-wrap ${theme}`}>
      <FontAwesome
        className="tooltip-icon"
        id={`tooltip-${placement}-${uniqueKey}`}
        name={'info-circle'}
      />
      <UncontrolledTooltip
        placement={placement}
        target={`tooltip-${placement}-${uniqueKey}`}
      >
        {info && String(info)}
      </UncontrolledTooltip>
    </div>
  )
}

TooltipInfo.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  placement: PropTypes.string,
  theme: PropTypes.string,
}

export {
  TooltipInfo
}