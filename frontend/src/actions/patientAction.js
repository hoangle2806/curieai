import {LOAD_PATIENTS, GET_ERRORS} from './types';
import axios from 'axios';


// fetch patients
export const loadPatients = (user) => dispatch => {
    axios.get(`doctor/${user.id}/patients/`)
        .then( res => dispatch({
            type: LOAD_PATIENTS,
            payload:res.data
        }))
        .catch( err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}