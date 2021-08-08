import { FETCH_WORKERS } from "./types";

export const fetchWorkers = () => dispatch => {
    fetch('http://localhost:5000/api/v1/worker', {
    method: "GET"
    }).then(res => res.json)
      .then(workers => dispatch({
        type: FETCH_WORKERS,
        payload: workers
    })).catch(error => {
        console.log(error)
    })
}
