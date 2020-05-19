import { of , timer} from 'rxjs'
import {getJSON,postJSON} from '../utils/utils';
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
        const { roomId } = action;

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
        if(activeRoom.id){        
            return of(Actions.fetchRoomConversation(activeRoom.id))
        }
    
    return of(Actions.setRoomText(''))

    })
)




export const fetchRoomCoversationEpic = (action$) => action$.pipe(
    ofType(Actions.FETCH_ROOM_CONVERSATION),
    switchMap((action) =>{
        if(action.roomId || action.roomId === 0){
            return getJSON(`${URLS.ROOMS}/${action.roomId}/text`).pipe(
                mergeMap(response => {
                   
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




export const setActiveRoomUsersEpic = (action$) => action$.pipe(
    ofType(Actions.SET_ACTIVE_ROOM),
    switchMap(({ activeRoom }) =>{
        if(activeRoom.id){
            return getJSON(`${URLS.ROOMS}/${activeRoom.id}/users`).pipe(
                mergeMap(response => {
                    return of(Actions.setRoomUsers(response.users))
                }),
                catchError(error => of(Actions.fetchRejected(error)))
            )
        }
        return of(Actions.setRoomUsers([]))
    })
)

export const setRoomUsersEpic = (action$) => action$.pipe(
    ofType(Actions.SET_ROOM_USERS),
    switchMap(({roomUsers}) =>{
        return of()

    })
)




