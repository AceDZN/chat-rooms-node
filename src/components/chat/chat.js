import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'; 
import { Button, Paper, Grid, Divider, TextField, List ,ListItem, ListItemIcon, ListItemText, Avatar, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Conversation from './Conversation';
import Actions from '../../actions'
let fetchChatTimeout = null;

const useStyles = makeStyles((theme)=>({
  paper:{
      width:'700px'
  },
  avatar: {
    minWidth: '20px',
    paddingRight: '10px'
  },
  userName: {
    "& span": {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      "&.small": {
        fontSize: '12px'
      }
    }
  },
  userNameSmall:{
    "& span": {
      fontSize: '14px'
    }
  },
  usersList: {
    maxHeight: '80vh',
    minHeight: '350px',
    height: '400px',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar' :{
      width: '2px',
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb' :{
      borderRadius: '2px 0 0 2px',
      background: 'rgba(0, 0, 0, 0.42)',
    }
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadow: '0px 1px 0px rgba(0, 0, 0, 0.9), 0px -1px 5px rgba(0, 0, 0, 0.5)'
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    boxShadow: '0 0 0 #000'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  logoutButton: {
    position: 'sticky',
    top: '100%',
    marginBottom: '26px',
    textAlign: 'center'
  }
}));

const Chat = ({activeRoom, userId, userName, users, activeUsers}) => {
    
  const classes = useStyles();
  const [messageValue, setMessageValue] = useState('');

  const dispatch = useDispatch();

    const fetchRoomConversation = (roomId)=>{
        dispatch(Actions.fetchRoomConversation(roomId));
        fetchChatTimeout = setTimeout(()=>{
            clearTimeout(fetchChatTimeout);
            return fetchRoomConversation(roomId )
        }, 5000)
    }

    useEffect(()=>{
        clearTimeout(fetchChatTimeout);
        fetchRoomConversation(activeRoom.id)
    }, [activeRoom.conversation.length, activeUsers, users.length]);

  const handleMessageValueChange = (e)=>{
    setMessageValue(e.target.value);
  }

  const handleKeyDown = (e) =>{
    if (e.keyCode === 13) {
        handleSendMessage();
    }
  }

  const handleSendMessage = ()=>{ 
      if(messageValue && messageValue !== ''){
        dispatch(Actions.sendMessage({messageValue, userId,roomId: activeRoom.id}))
        setMessageValue('');
      }
  }
  
  const handleLogout = ()=>{
    dispatch(Actions.logoutUser());
  }

  const renderUser = (user)=>{
    if(users[user] && users[user].id !== userId){
      return (
        <ListItem button key={`user_${user}`}>
            <ListItemIcon className={classes.avatar}>
                <Avatar className={classes.avatarSmall} style={{backgroundColor:users[user].color }}>{users[user].name[0]}</Avatar>
            </ListItemIcon>
            <ListItemText primary={users[user].name} className={`${classes.userName} ${classes.userNameSmall}`}></ListItemText>
        </ListItem>
      )
    } else {return null}
  }

  return (
    <Grid container component={Paper} className={classes.chatSection} >
        <Grid item xs={3} className={classes.borderRight500}>
            <List>
                <ListItem key={`user_${userId}`}>
                    <ListItemIcon>
                        <Avatar alt={userName} src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={userName} className={classes.userName}></ListItemText>
                </ListItem>
                <div className={classes.usersList}>
                  { activeRoom.users ? activeRoom.users.map(renderUser) : null}
                </div>
            </List>
            <div className={classes.logoutButton} >
              <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={handleLogout}>Logout</Button>
            </div>
        </Grid>
        <Grid item xs={9}>
            <Conversation />
            <Divider />
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={10}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={handleMessageValueChange} value={messageValue} onKeyDown={handleKeyDown} />
                </Grid>
                <Grid item xs={2} align="right">
                    <Fab color="primary" aria-label="add" onClick={handleSendMessage}><SendIcon /></Fab>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}

const mapStateToProps = ({ userReducer, chatReducer }) => {
    return {
      users: userReducer.users,
      userName: userReducer.userName,
      userId: userReducer.userId,
      activeRoom: chatReducer.activeRoom,
      activeUsers: chatReducer.activeRoom.users
    }
  }
  export default connect(
    mapStateToProps
  )(Chat)

