import { of } from 'rxjs'
import {getJSON, postJSON, removeJSON} from '../utils/utils';
import { switchMap, mergeMap, catchError } from 'rxjs/operators'

import { ofType } from 'redux-observable'

import Actions from '../actions'

const URLS = {
    USERS: 'http://localhost:3001/users',
    ROOMS: 'http://localhost:3001/rooms',
}

export const fetchChatRoomsEpic = (action$) => action$.pipe(
    ofType(Actions.FETCH_CHAT_ROOMS),
    switchMap((action) =>{
        return getJSON(URLS.ROOMS).pipe(
            mergeMap(response => {
                return of(Actions.setChatRooms(response))
            }),
            catchError(error => of(Actions.fetchRejected(error)))
        )
    })
)


export const setActiveRoomTextEpic = (action$) => action$.pipe(
    ofType(Actions.SET_ACTIVE_ROOM),
    switchMap((action) =>{
        const { activeRoom } = action;
        if(activeRoom){        
            return of(Actions.fetchRoomConversation(activeRoom.id))
        }
        return of(Actions.setRoomText(''));
    })
)

export const fetchRoomCoversationEpic = (action$, state) => action$.pipe(
    ofType(Actions.FETCH_ROOM_CONVERSATION),
    switchMap((action) =>{
        const { roomId } = action;
        if(roomId || roomId === 0){
            return getJSON(`${URLS.ROOMS}/${roomId}/text`).pipe(
                mergeMap(response => {
                    const {userReducer} = state.value;
                    const unknowUsers = response.text.reduce((acc,message)=>{
                        const messageUser = userReducer.users.filter((user)=>user.id ===  message.userId);
                        if(!messageUser.length) acc.push(message.userId)
                        return acc
                    }, []);

                    if(unknowUsers.length){
                        return of(Actions.fetchUsersInRoom(roomId), Actions.getUsers())
                    }

                    return of(Actions.setRoomText(response.text))
                }),
                catchError(error => of(Actions.fetchRejected(error)))
            )
        }
        return of(Actions.setRoomText(''))
    })
)

export const sendMessageEpic = (action$) => action$.pipe(
    ofType(Actions.SEND_MESSAGE),
    switchMap((action) =>{
        const { messageValue, userId, roomId } = action;
        if(roomId || roomId === 0){
            return  postJSON(`${URLS.ROOMS}/${roomId}/text`,{ text: messageValue, userId }).pipe(
                    switchMap(response => of(Actions.fetchRoomConversation(roomId))),
                    catchError(error => of(Actions.fetchRejected(error)))
                )
        }
        return of(Actions.setRoomText(''))
    })
)

export const setActiveRoomEpic = (action$) => action$.pipe(
    ofType(Actions.SET_ACTIVE_ROOM),
    switchMap((action) =>{
        const { activeRoom, userId } = action;
            if(activeRoom){
            return postJSON(`${URLS.ROOMS}/${activeRoom.id}/users`,{ userId: userId }).pipe(
                mergeMap(response => {
                    return of(Actions.fetchUsersInRoom(activeRoom.id))
                }),
                catchError(error => of(Actions.fetchRejected(error)))
            )
            
        }
        return of(Actions.setRoomUsers([]))
    })
)



export const leaveActiveRoomEpic = (action$) => action$.pipe(
    ofType(Actions.LEAVE_ACTIVE_ROOM),
    switchMap((action) =>{
        const { activeRoom, userId } = action;
        if(activeRoom){
            return removeJSON(`${URLS.ROOMS}/${activeRoom.id}/users/${userId}`).pipe(
                mergeMap(response => {
                    return of(Actions.setActiveRoom(null, userId ))
                }),
                catchError(error => of(Actions.fetchRejected(error)))
            )
            
        }
        return of(Actions.setRoomUsers([]))
    })
)

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

export const fetchUsersInRoomEpic = (action$) => action$.pipe(
    ofType(Actions.FETCH_USERS_IN_ROOM),
    switchMap((action) =>{
        const { roomId } = action;
        if(roomId || roomId === 0){
            return getJSON(`${URLS.ROOMS}/${roomId}/users`).pipe(
                mergeMap(response => {
                    return of(Actions.setRoomUsers(response.users.filter( onlyUnique )))
                }),
                catchError(error => of(Actions.fetchRejected(error)))
            )
        }
        return of(Actions.setRoomUsers([]))
    })
)