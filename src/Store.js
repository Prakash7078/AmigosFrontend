import {createContext,useReducer} from 'react';
export const Store=createContext();
const initialState={
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null,
    userName:localStorage.getItem('userName')?localStorage.getItem('userName'):null,
};
function reducer(state,action){
    switch(action.type){
        case 'USER_SIGNIN':{
            return {...state,userInfo:action.payload};
        }
        case 'USER_SIGNOUT':{
            return {...state,userInfo:null};
        }
        case 'GOOGLE_SIGNIN':{
            return {...state,userName:action.payload};
        }
        case 'GOOGLE_SIGNOUT':{
            return {...state,userName:null};
        }
        default:
            return state;
    }
}
export function StoreProvider(props){
    const [state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}