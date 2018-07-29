import { interfaceConstants } from '../constants';

/**
  called _interface_ and _interface bacause "interface" is reserved word in strict mode
*/

let initialState = {};

let _interface_ = JSON.parse(localStorage.getItem('interface'));
let user = JSON.parse(localStorage.getItem('user'));

if (_interface_) {
	initialState = { type: _interface_ };
} else if (user) {
	const { role } = user;

  if (role) {
    initialState = { type: role };
    localStorage.setItem('interface', JSON.stringify(role));
  }
}

export function _interface(state = initialState || {}, action) {
  switch(action.type) {
  	case interfaceConstants.SWITCH_INTERFACE:
  		return {
        type: action._interface
      };
    case interfaceConstants.SET_INTERFACE:
      return {
        type: action._interface
      };
  	default:
  		return state;
  }
}