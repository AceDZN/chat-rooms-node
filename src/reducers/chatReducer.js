import Actions from '../actions'

const chatReducer = (state = [], action) => {
    console.log(action,"ACTION");

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
                ActiveRoom: {
                    ...action.activeRoom,
                    conversation: []
                }
            }
        case Actions.SET_ROOM_TEXT:
            return {
                ...state,
                ActiveRoom: {
                    ...state.ActiveRoom,
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
                ActiveRoom: {
                    ...state.ActiveRoom,
                    users: action.roomUsers
                }
            }

        case Actions.FETCH_ROOM_CONVERSATION:
            return {
                ...state,
                roomId: state.ActiveRoom.id,
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