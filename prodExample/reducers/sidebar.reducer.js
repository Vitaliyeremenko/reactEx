import { sidebarConstants } from '../constants';

const initialState = {
  isCollapsed: typeof window === 'object' && window.innerWidth > 768
}

export function sidebar(state = initialState, action) {
  switch (action.type) {
    case sidebarConstants.SHOW:
      return {
        isCollapsed: true
      };
    case sidebarConstants.HIDE:
      return {
        isCollapsed: false
      };
    default:
      return state
  }
}