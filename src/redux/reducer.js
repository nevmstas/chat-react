import {JOINED, SET_MESSAGES, SET_USERS, NEW_MESSAGES, SET_DATA} from './types'


export default (state, action) =>{
    switch (action.type) {
        case JOINED:
            return {
               ...state,
               isJoined: true,
               roomId: action.payload.roomId,
               userName: action.payload.userName    
            }
        case SET_USERS:
            return{
                ...state,
                users: action.payload
            }
        case SET_MESSAGES:
            return{
                ...state,
                messages: action.payload
            }
        case NEW_MESSAGES:
            return{
                ...state,
                messages: [...state.messages, action.payload]
            }
        case SET_DATA:
            return{
                ...state,
                users: action.payload.users,
                messages: action.payload.messages
            }
    
        default:
           return state
    }
}