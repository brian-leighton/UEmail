import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
// using 'as' allows us to rename imported variables
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
});
