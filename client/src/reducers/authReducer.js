import { FETCH_USER } from "../actions/types";

export default function (state = null, action) {
  // state=null indicates to the function that we are not sure if our user is logged in
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    // the function will return either 'null', the user payload (action.payload), or false
    default:
      return state;
  }
}
