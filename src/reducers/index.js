// E:\auth-frontend-backend\frontend\src\reducers\index.js

import { combineReducers } from "redux";
// Import your individual reducers here
// import userReducer from './userReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  // user: userReducer,
  // Add other reducers here
});

export default rootReducer;
