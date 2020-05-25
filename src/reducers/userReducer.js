import Actions from '../actions'
const initialState = { users: [] };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case Actions.GET_USERS:
        return {
          ...state,
          users: state.users
        }
      case Actions.CREATE_USER:
        return {
          ...state,
          userName: action.userName
        }
      case Actions.SET_USER:
        return {
          ...state,
          userId: action.userId,
          userName: action.userName
        }
      
      case Actions.LOGOUT_USER:
        return {
          ...state,
          userName: action.userName,
          userId: action.userId,
        }
      case Actions.LOGIN_USER:
        return {
          ...state,
          users: state.users,
          userName: action.userName,
        }
      case Actions.SET_USERS:
        const allUsers = [...state.users, ...action.users].filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.id === thing.id && t.name === thing.name
          ))
        )
        return {
          ...state,
          users: allUsers.reduce((acc,cur)=>{
            const newUserObj = cur;
            if(!newUserObj.color) newUserObj.color =  "hsla(" + ~~(360 * Math.random()) + ", 50%, 60%, 1)";
            acc.push(newUserObj)
            return acc
          },[])
        }
      default:
        return state
    }
  }
  
  export default userReducer