// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import aboutOpen from './about';
import open from './export';
import libraries from './libraries';
import targets from './targets';
import templates from './templates';
import payloads from './payloads';
import uiState from './uiState';
import messages from './messages';

const rootReducer = combineReducers({
  aboutOpen,
  open,
  libraries,
  targets,
  templates,
  payloads,
  uiState,
  messages,

  router
});

export default rootReducer;
