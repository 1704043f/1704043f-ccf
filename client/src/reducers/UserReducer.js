import {
    USER_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
    role : '',
    id : '',
}

export default (state = INITIAL_STATE , action) => {
    switch(action.type){
        case USER_PROFILE : 
            return {  role: action.payload.role, id: action.payload.id }
        default :
            return state;
    }
}