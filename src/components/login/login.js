import React, {useState, useEffect} from 'react';
import { makeStyles, Grid, TextField, Button} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { connect, useDispatch } from 'react-redux'
import Actions from '../../actions'



const useStyles = makeStyles((theme)=>({
    margin: {
        margin: theme.spacing() * 2,
    },
    loginHead:{
        justifyContent: 'center',
    },
    fingerprint:{
        width:100,
        height:100
    }
}));



const Login =  (props)=>{
    const { userId } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setUserName] = useState('');
    
    const handleInputChange = (e)=>{
        setUserName(e.target.value);
    }

    const handleKeyDown = (e) =>{
        if (e.keyCode == 13) {
            handleLogin();
        }
    }

    const handleLogin = ()=>{
        if(name && name !== ''){
            dispatch(Actions.loginUser(name));
        }
    }
    
    useEffect(() => {
        console.log('login useeffect', props);
        if(userId && userId !== '') props.history.push('/Rooms');
    }, [userId])


    useEffect(() => {
      dispatch(Actions.getUsers());
    }, [dispatch])
  
    return (
        <div className={classes.margin}>
            <Grid container spacing={8} alignItems="center" className={classes.loginHead}>
                <Grid item>
                    <Fingerprint className={classes.fingerprint} />
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <Face />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                    <TextField id="username" label="Username" type="email" fullWidth autoFocus required value={name} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                </Grid>
            </Grid>
            
            <Grid container justify="center" style={{ marginTop: '32px' }}>
                <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={handleLogin}>Login</Button>
            </Grid>
        </div>
    );
}

const mapStateToProps = ({ userReducer, chatReducer }) => {
    return {
      userId: userReducer.userId,
    }
  }
  export default connect(
    mapStateToProps
  )(Login)