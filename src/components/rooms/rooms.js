import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from 'react-redux'
import { List, ListItem, ListItemText, Grid} from '@material-ui/core';
import { Link } from "react-router-dom";

import Actions from '../../actions'

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing() * 2,
    },
    paper: {
        padding: theme.spacing(),
        width: '400px',
        maxWidth: '95%',
        margin: '0 auto'
    },
    pageHeader: {
        justifyContent: 'center'
    },
    headerText: {
        fontSize: '26px',
        fontWeight: 'bold'
    },
    pageFooter: {
        justifyContent: 'center',
        position: 'sticky',
        top: '100%'
    },
    footerText: {
        fontSize: '14px'
    }

}));


const Rooms = ({chatRooms, userName, userId, history, activeRoom}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(activeRoom && (activeRoom.id || activeRoom.id === 0)){
      dispatch(Actions.leaveActiveRoom(activeRoom, userId));
    }
  }, [])


  const handleClickOnRoom = (room)=>{
    dispatch(Actions.setActiveRoom(room, userId))
    history.push('/Chat');
  }

  const handleLogout = ()=>{
    dispatch(Actions.logoutUser())
    history.push('/');
  }

  const renderChatRooms = (chatRooms) =>{
        return chatRooms && chatRooms.length ? (
            <List  spacing={8}>
            {chatRooms.map((room)=>{
                return (
                    <ListItem key={`chat-room-${room.id}`} onClick={()=>handleClickOnRoom(room)} button component="a"><ListItemText primary={room.name} /></ListItem>
                )
            })}
            </List>
        ) : null
    }

  return (
    <>
        <div className={classes.margin}>
            <Grid container spacing={8} className={classes.pageHeader}>
                <Grid item className={classes.headerText}>
                    Rooms
                </Grid>
            </Grid>
        </div>
        {renderChatRooms(chatRooms)}
        <Grid container spacing={8} className={classes.pageFooter}>
            <Grid item className={classes.footerText}>
            connected as: {userName} [{userId}] <Link to="/" onClick={handleLogout}>Logout</Link> 
            </Grid>
        </Grid>
        
         
        </>
  );
}


const mapStateToProps = ({ userReducer, chatReducer }) => {
    return {
      userName: userReducer.userName,
      userId: userReducer.userId,
      chatRooms: chatReducer.chatRooms,
      activeRoom: chatReducer.activeRoom
    }
  }
  export default connect(
    mapStateToProps
  )(Rooms)

