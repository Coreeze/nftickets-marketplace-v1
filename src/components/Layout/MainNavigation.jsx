import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
import { useHistory } from 'react-router-dom';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  //check if the user is already logged in and then show or not the login page
  const isLoggedIn = authCtx.isLoggedIn;
  //function for logout button
  const history = useHistory()
  const logoutHandler = () => {
    authCtx.logout();
    //redirect back to the main page. should be changed to navigation guards. for now leave
    history.replace("/");
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {/* decide what to show based on the fact that a user is loggedIn */}
          {!isLoggedIn && (<li><Link to='/auth'>Login</Link></li>)}
          {/* for pass reset, no need for MVP */}
          {/* {isLoggedIn && (<li><Link to='/profile'>Profile</Link></li>)} */}
          {isLoggedIn && (<li> <button onClick={logoutHandler}>Logout</button></li>)}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
