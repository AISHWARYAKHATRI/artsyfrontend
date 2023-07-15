import React, { useState, useEffect } from 'react'
import decode from 'jwt-decode'
import { AppBar, Button, Typography, Toolbar, Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import useStyles from './styles'
import logo from '../../images/logo.png'

const Navbar = () => {
     
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory(); 
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    // JWT ...
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    history.push('/');
  }

  return (
    <AppBar className={classes.appBar} position="sticky">
        <div className={classes.brandContainer}>
            <img className={classes.image} src={logo} alt="memories" height="90" />
            <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Artsy</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            { user ? (
                <div className={classes.profile}>
                   <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name.charAt(0)}</Avatar> 
                   <Typography className={classes.userName} variant="h6" style={{ color: 'black' }}>{user?.result?.name}</Typography>
                   <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
              <>
                <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
              </>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar