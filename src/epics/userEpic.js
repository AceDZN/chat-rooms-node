import { of } from 'rxjs'
import {getJSON,postJSON} from '../utils/utils';
import { switchMap, mergeMap, catchError} from 'rxjs/operators'
import { ofType } from 'redux-observable'
import Actions from '../actions'



const URLS = {
    USERS: 'http://localhost:3001/users',
    ROOMS: 'http://localhost:3001/rooms',
}

export const setUserEpic = (action$) => action$.pipe(
    ofType(Actions.SET_USER),
    mergeMap(action =>  {
        return of(Actions.fetchChatRooms(action.payload));
    })
)



export const getUsersEpic = (action$, state) => action$.pipe(
    ofType(Actions.GET_USERS),
    switchMap((action) =>{
        const {userReducer} = state.value;
        return  getJSON(`${URLS.USERS}`).pipe(
                switchMap(response => {
                    if(response.length !== userReducer.users.length){
                        return of(Actions.setUsers(response))
                    } else {
                        return of()
                    }
                }),
                catchError(error => of(Actions.fetchRejected(error)))
            )
    })
)



export const loginUserEpic = (action$,state) => action$.pipe(
    ofType(Actions.LOGIN_USER),
    switchMap((action) =>{
        const {userReducer} = state.value;
        
        const userInList = userReducer.users.filter((user)=>user.name === action.userName);
        
        if(userInList.length) {
            return of(Actions.setUser({userId:userInList[0].id, userName:userInList[0].name}))
        }
        return of(Actions.createUser(action.userName))
    })
)




export const createUserEpic = (action$) => action$.pipe(
    ofType(Actions.CREATE_USER),
    switchMap((action) =>{
        const { userName } = action;
        return  postJSON(`${URLS.USERS}`,{ name: userName }).pipe(
                switchMap(({response} )=> {
                    return of(Actions.setUser({userId: response.userId, userName:userName}))
                }),
                catchError(error => of(Actions.fetchRejected(error)))
            )
    })
)
