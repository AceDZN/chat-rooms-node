import { combineEpics } from 'redux-observable'
import * as userEpic from './userEpic'
import * as chatEpic from './chatEpic'



export default combineEpics(
  ...Object.values({
    ...userEpic,
    ...chatEpic
  })
)
