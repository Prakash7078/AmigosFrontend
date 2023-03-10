import {SIGN_IN} from '../constants/actionTypes';
export default (users = [], action) =>{
    switch(action.type){
        case SIGN_IN:{
            return {...users,userInfo:action.payload};
        }
        default:{
            return users;
        }
    }
}