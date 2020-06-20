import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import {reducer as Reminder} from "./containers/cell/reducers/reducers";

const store = createStore(
  Reminder,
  applyMiddleware(logger, thunk)
)

export default store


