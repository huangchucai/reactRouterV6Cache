import { combineReducers } from "redux";

const rootData = (state = { userInfo: { name: "hcc" }, age : 1}, action) => {
  switch (action.type) {
    case "SET_ROOT_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default combineReducers({
  rootData,
});
