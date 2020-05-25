const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const SET_USER = 'SET_USER';
const LOGIN_USER = 'LOGIN_USER';
const SET_USERS = 'SET_USERS';
const LOGOUT_USER = 'LOGOUT_USER';

const getUsers = () => ({
  type: GET_USERS
})

const createUser = userName => ({
  type: CREATE_USER,
  userName
})

const setUser = ({ userId, userName } ) => ({
  type: SET_USER,
  userName,
  userId
})

const loginUser = (userName) => ({
  type: LOGIN_USER,
  userName
})

const logoutUser = () => ({
  type: LOGOUT_USER,
  userName:'',
  userId: null
})

const setUsers = users => ({
  type: SET_USERS,
  users
})

export default {
  GET_USERS,
  CREATE_USER,
  SET_USER,
  LOGIN_USER,
  SET_USERS,
  LOGOUT_USER,
  getUsers,
  createUser,
  setUser,
  loginUser,
  setUsers,
  logoutUser
}