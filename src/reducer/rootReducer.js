import { combineReducers } from "redux";
import workerReducer from './workerReducer';

export default combineReducers({
    workers: workerReducer
})