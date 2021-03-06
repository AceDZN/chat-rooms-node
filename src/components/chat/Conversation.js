import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme)=>({
  conversation:{
    maxHeight:'80vh',
    maxWidth:'100%',
    height: '450px',
    minHeight: '350px',
    minWidth: '400px',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '0 16px',
    backgroundColor: "#f5fbff",

    '&::-webkit-scrollbar' :{
      width: '2px',
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb' :{
      borderRadius: '2px 0 0 2px',
      background: 'rgba(0, 0, 0, 0.42)',
    }
  },
  messageWrap:{
    display: 'block'
  },

  message:{
    position: 'relative',
    float: 'left',
    clear: 'both',
    width:'auto',
    minWidth: '70px',
    maxWidth: '90%',
    padding: '12px 15px',
    marginBottom: '5px',
    background: 'white',
    borderRadius:'3px',
    filter: 'drop-shadow(0 1px 2px rgba(36, 91, 140, 0.3))',
    fontSize: '16px',
    lineHeight: '150%',
    wordWrap: 'break-word',

    '&.with-arrow': {
      marginTop: '5px',
      '&:before': {
        content: "''",
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'translateX(-10px)',
        width: 0, 
        height: 0, 
        borderBottom: '17px solid transparent', 
        borderRight: '17px solid white',
        
      }
    },
    
    
  },
  self:{
    background: '#3794ff',
    color: 'white',
    float: 'right',
      '&.with-arrow': {
        '&:before': {
          left: 'initial',
          right: 0,
          transform: 'translateX(10px)',
          borderRight: 0,
          borderLeft: '17px solid #3794ff', 
        }
    }
  },
  text:{
    
  },
  sender: {
    fontSize: '10px',
    fontWeight: 'bold',
  },

  time: {
    fontSize: '12px',
    textAlign: 'right',
    opacity: '.4',
    
  }
}));

const Conversation = ({conversation, userId, users}) => {
  const classes = useStyles();
  const conversationWindow = useRef(null);
  useEffect(()=>{
    if(conversationWindow.current){
      conversationWindow.current.scrollTop = conversationWindow.current.scrollHeight;
    }
  },[ conversation.length ]);
  
  const renderMessage = (message, index)=>{
    const currentUser = users.filter((user)=>user.id ===  message.userId);
    const isFirst = index === 0 || conversation[index-1].userId !== message.userId;
    return (
      <ListItem key={`chat_text_${index}`} className={classes.messageWrap}>
          <Grid container className={`${classes.message} ${message.userId === userId ? classes.self : 'other'} ${isFirst ? 'with-arrow':''}`}>
              { userId !== message.userId ? (
                <Grid item xs={12} className={classes.sender} style={{color: users[message.userId] ? users[message.userId].color : "#"+((1<<12)*Math.random()|0).toString(16)}}>
                  { currentUser[0].name }
                </Grid>
              ) : null}
              <Grid item xs={12}className={classes.text}> 
                {message.text}
              </Grid>
              <Grid item xs={12} className={classes.time}>
                09:30
              </Grid>
          </Grid>
        </ListItem>
        
    ) 
  }

  return (
      <div className={classes.conversation} ref={conversationWindow}>
        {conversation && conversation.map(renderMessage)}
      </div>
  )
}

const mapStateToProps = ({ userReducer, chatReducer }) => {
    return {
      users: userReducer.users,
      userId: userReducer.userId,
      conversation: chatReducer.activeRoom.conversation
    }
  }
  export default connect(
    mapStateToProps
  )(Conversation)

