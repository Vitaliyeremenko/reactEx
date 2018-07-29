import FontAwesome from 'react-fontawesome';
import React from 'react';

const valueWithIcon = ({ children, placeholder, value }) => (
  <div className="Select-value" title={value.title}>
    {value.icon && <FontAwesome
      name={value.icon}
      className={`Select-icon ${value.icon} mr-2`}
    />}
    <span className="Select-value-label-text">{children}</span>
  </div>
)

const optionWithIcon = props => {
  const {
    option,
    onSelect,
    onFocus,
    isFocused,
    className,
    children
  } = props;
  const {
    title,
    icon
  } = option;

  const handleMouseEnter = e => onFocus(option, e);
  const handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();

    onSelect(option, e);
  }
  const handleMouseMove = e => {
    if (isFocused) return;
    
    onFocus(option, e);
  }

  return (
    <div className={className}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      title={title}
    >
    {icon && <FontAwesome
      name={icon}
      className={`Select-icon ${icon} mr-2`}
    />}
      {children}
    </div>
  );
}

export {
  optionWithIcon,
  valueWithIcon,
}