import Actions from '../actions'

const chatReducer = (state = [], action) => {

    switch (action.type) {
        case Actions.FETCH_CHAT_ROOMS:
            return {
                ...state,
            }

        case Actions.SET_CHAT_ROOMS:
            return {
                ...state,
                chatRooms: action.chatRooms

            }

        case Actions.SET_ACTIVE_ROOM:
            return {
                ...state,
                activeRoom: {
                    ...action.activeRoom,
                    conversation: []
                },
                userId: action.userId
            }
        
        case Actions.LEAVE_ACTIVE_ROOM:
            return {
                ...state,
                activeRoom: {
                    ...action.activeRoom,
                    conversation: []
                },
                userId: action.userId
            }
            
        case Actions.SET_ROOM_TEXT:
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    conversation: action.conversation
                }
            }

        case Actions.FETCH_USERS_IN_ROOM:
            return {
                ...state,
                roomId: action.roomId
            }
            
        case Actions.SET_ROOM_USERS:
            return {
                ...state,
                activeRoom: {
                    ...state.activeRoom,
                    users: action.roomUsers
                }
            }

        case Actions.FETCH_ROOM_CONVERSATION:
            return {
                ...state,
                roomId: state.activeRoom.id,
                ts: Date.now()
            }

        case Actions.FETCH_CANCEL:
            return {
                ...state
            }
        
        case Actions.SEND_MESSAGE:
            return {
                ...state,
                roomId: action.roomId,
                userId: action.userId,
                messageValue: action.messageValue
            }
        default:
            return state
    }
  }
  
  export default chatReducer