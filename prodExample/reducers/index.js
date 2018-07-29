import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { activation } from './activation.reducer';
import { alert } from './alert.reducer';
import { contacts } from './contacts.reducer';
import { sidebar } from './sidebar.reducer';
import { user } from './user.reducer';
import { tasks } from './tasks.reducer';
import { platform } from './platform.reducer';
import { _interface } from './interface.reducer';
import { bloggers } from './bloggers.reducer';
import { deals } from './deals.reducer';
import { settings } from './settings.reducer';
import {chats} from "./chat.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  activation,
  alert,
  contacts,
  sidebar,
  user,
  tasks,
  platform,
  _interface,
  bloggers,
  deals,
  settings,
  chats
});

export default rootReducer;