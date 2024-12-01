import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/hoots'>HOOTS</Link></li>
            <li><Link to="/hoots/new">NEW HOOT</Link></li>
            <li><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;