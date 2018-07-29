import { interfaceConstants } from '../constants';
import { history } from '../helpers';

export const interfaceActions = {
	switchInterface,
	setInterface,
}

function setInterface(role) {
	if (role) {
		localStorage.setItem('interface', JSON.stringify(role));

		switch(role) {
			case 'advertiser':
				history.push('/dashboard/search')
				return {
					type: interfaceConstants.SET_INTERFACE,
					_interface: role
				}
			case 'blogger':
				history.push('/dashboard')
				return {
					type: interfaceConstants.SET_INTERFACE,
					_interface: role
				}
		}
	}
}

function switchInterface(_interface) {
	switch(_interface) {
		case 'advertiser':
			localStorage.setItem('interface', JSON.stringify('blogger'))
			history.replace('/dashboard');

			return {
				type: interfaceConstants.SWITCH_INTERFACE,
				_interface: 'blogger'
			}
		case 'blogger':
			localStorage.setItem('interface', JSON.stringify('advertiser'))
			history.replace('/dashboard/search');

			return {
				type: interfaceConstants.SWITCH_INTERFACE,
				_interface: 'advertiser'
			}
	}
}