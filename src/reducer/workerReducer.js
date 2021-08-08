import { FETCH_WORKERS } from "../actions/types";

const initialState ={
    workers:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case FETCH_WORKERS:
            return {
                ...state,
                workers: action.payload
            }
        default:
            return state
    }
}