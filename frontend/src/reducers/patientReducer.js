import {LOAD_PATIENTS} from '../actions/types';

const initialState = {
    patients: []
}

export default function patientReducer( state = initialState, action){
    switch (action.type){
        case LOAD_PATIENTS:
            return {
                ...state,
                patients: [...action.payload]
            };
        default:
            return state;
    }
}