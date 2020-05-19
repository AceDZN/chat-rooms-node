const FETCH_CHAT_ROOMS = 'FETCH_CHAT_ROOMS';
const FETCH_REJECTED = 'FETCH_REJECTED';
const SET_CHAT_ROOMS = 'SET_CHAT_ROOMS';
const SET_ACTIVE_ROOM = 'SET_ACTIVE_ROOM';
const SET_ROOM_TEXT = 'SET_ROOM_TEXT';
const SET_ROOM_USERS = 'SET_ROOM_USERS';
const SEND_MESSAGE = 'SEND_MESSAGE';
const FETCH_ROOM_CONVERSATION = 'FETCH_ROOM_CONVERSATION';
const FETCH_USERS_IN_ROOM = 'FETCH_USERS_IN_ROOM';
const FETCH_CANCEL = 'FETCH_CANCEL';


const fetchChatRooms = action => ({
    type: FETCH_CHAT_ROOMS
})

const fetchRejected = error => ({
    type: FETCH_REJECTED,
    status: error?.xhr?.status || 500,
    message: error?.xhr?.statusText || 'Unknown error'
})

const setChatRooms = chatRooms => ({
    type: SET_CHAT_ROOMS,
    chatRooms
})

const setActiveRoom = activeRoom => ({
    type: SET_ACTIVE_ROOM,
    activeRoom
})

const setRoomText = conversation => ({
    type: SET_ROOM_TEXT,
    conversation
})

const setRoomUsers = roomUsers => ({
    type: SET_ROOM_USERS,
    roomUsers
})

const fetchRoomConversation = roomId => ({
    type: FETCH_ROOM_CONVERSATION,
    roomId
})

const sendMessage = ({messageValue,roomId, userId})=> ({
    type: SEND_MESSAGE,
    messageValue,
    roomId, 
    userId
})

const fetchUsersInRoom = roomId => ({
    type: FETCH_USERS_IN_ROOM,
    roomId
})

const cancelFetch = ()=>({
    type: FETCH_CANCEL,
})

export default {
    FETCH_CHAT_ROOMS,
    FETCH_REJECTED,
    SET_CHAT_ROOMS,
    SET_ACTIVE_ROOM,
    SET_ROOM_TEXT,
    SET_ROOM_USERS,
    SEND_MESSAGE,
    FETCH_ROOM_CONVERSATION,
    FETCH_USERS_IN_ROOM,
    FETCH_CANCEL,
    fetchChatRooms,
    fetchRejected,
    setChatRooms,
    setActiveRoom,
    setRoomText,
    setRoomUsers,
    sendMessage,
    fetchRoomConversation,
    fetchUsersInRoom,
    cancelFetch
}