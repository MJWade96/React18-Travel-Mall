import { Middleware } from "redux";

export const actionLog: Middleware = ({dispatch, getState}) => (next) => (action) => {
  console.log("state 当前", getState());
  console.log("fire action ", action);
  next(action);
  console.log("state 更新", getState());
};
