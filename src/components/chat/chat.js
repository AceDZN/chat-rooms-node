import React, {useState, useEffect} from 'react';
import {Observable} from 'rxjs';

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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '10px'
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

const Chat = ({ActiveRoom, userId, userName,users,conversation}) => {
    
  const classes = useStyles();
  const [messageValue, setMessageValue] = useState('');

  const dispatch = useDispatch();

    const fetchRoomConversation = ({roomId})=>{
        console.log('fetchRoomConversation,',roomId);
        dispatch(Actions.fetchRoomConversation(roomId));
        fetchChatTimeout = setTimeout(()=>{
            clearTimeout(fetchChatTimeout);
            console.log('fetchRoomConversation, AFTER DELAY 5000',roomId);
            return fetchRoomConversation({roomId })
        }, 5000)
    }

    useEffect(()=>{
        clearTimeout(fetchChatTimeout);
        fetchRoomConversation({roomId: ActiveRoom.id })
    }, [conversation.length]);

  const handleMessageValueChange = (e)=>{
    setMessageValue(e.target.value);
  }

  const handleKeyDown = (e) =>{
    if (e.keyCode == 13) {
        handleSendMessage();
    }
}

  const handleSendMessage = ()=>{ 
      if(messageValue && messageValue !== ''){
        dispatch(Actions.sendMessage({messageValue, userId,roomId: ActiveRoom.id}))
        setMessageValue('');
      }
    
  }
  
  const handleLogout = ()=>{
    dispatch(Actions.logoutUser())

  }

  return (
    <Grid container component={Paper} className={classes.chatSection} >
        <Grid item xs={3} className={classes.borderRight500}>
            <List>
                <ListItem key={`user_${userId}`}>
                    <ListItemIcon>
                        <Avatar alt={userName} src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={userName}></ListItemText>
                </ListItem>
                { ActiveRoom.users ? ActiveRoom.users.map((user)=>(
                    <ListItem button key={`user_${user}`}>
                        <ListItemIcon className={classes.avatar}>
                            <Avatar className={classes.small}>{users[user].name}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={users[user].name}></ListItemText>
                    </ListItem>
                )) : null}
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
      ActiveRoom: chatReducer.ActiveRoom,
      conversation: chatReducer.ActiveRoom.conversation
    }
  }
  export default connect(
    mapStateToProps
  )(Chat)

