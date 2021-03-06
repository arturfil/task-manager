import { applyMiddleware, combineReducers, createStore } from "redux";
import recorderReducer from "./recorder";
import userEventsReducer from "./userEvents";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;