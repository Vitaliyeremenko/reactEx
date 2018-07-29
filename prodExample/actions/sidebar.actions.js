import { sidebarConstants } from '../constants'

export const sidebarActions = {
  show,
  hide
}

function hide() {
  return {
    type: sidebarConstants.HIDE
  }
}

function show() {
  return {
    type: sidebarConstants.SHOW
  }
}