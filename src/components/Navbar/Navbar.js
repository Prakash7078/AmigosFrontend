import React, { useContext } from 'react'
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core'
import useStyles from './styles';
import amigos from '../../images/Amigos.jpg';
import {Link} from 'react-router-dom';
import { Store } from "../../Store";
const Navbar = () => {
    const classes=useStyles();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state;
    const {userName}=state;
    const signoutHandler=()=>{
        ctxDispatch({type:'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
    }
    const googleSignout=()=>{
        ctxDispatch({type:'GOOGLE_SIGNOUT'});
        localStorage.removeItem('userName');
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/"className={classes.heading} variant="h2" align="center">Amigos</Typography>
                <img className={classes.image} src={amigos} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {userInfo?.data?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={userInfo.data.name} >{userInfo.data.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{userInfo.data.name}</Typography>
                        <Button variant="contained" onClick={signoutHandler}className={classes.logout} color="secondary">Logout</Button>
                    </div>
                ):(
                    <div className={classes.profile}>
                        <Typography className={classes.userName} variant="h6">{userName}</Typography>
                        {userName &&<Button variant="contained" onClick={googleSignout}className={classes.logout} color="secondary">Logout</Button>}
                        {!userName &&<Button component={Link} to="/signup" variant="contained" color="primary">signIn</Button>}
                    </div>
                   
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;