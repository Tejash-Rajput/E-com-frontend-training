/**
 * Navbar Component
 * 
 * This component renders the top navigation bar of the application, including:
 * - Brand logo and website name.
 * - User greeting with the logged-in user's name.
 * - Login/Logout functionality.
 * - Cart link displaying the total quantity of items.
 * - Orders link for viewing past orders.
 * 
 * @component
 */

import React, { useEffect, useState } from 'react';
import './styles/common.scss';
import login_icon from '../../assets/user-interface.png';
import logout from '../../assets/logout.png';
import cart_icon from '../../assets/shopping-cart.png';
import package_icon from '../../assets/package.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Get token, user data, and cart quantity from Redux store
  const token = useSelector((state) => state.signup.token || state.login.token);
  const users = useSelector((state) => state.signup.users || state.login.users);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // State for login status and user name
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [name, setName] = useState('not logged in');

  /**
   * Effect to set user name based on token and users list
   */
  useEffect(() => {
    if (token) {
      const parsedToken = JSON.parse(token);
      const foundUser = users.find((u) => u.email === parsedToken.email);
      
      if (foundUser) {
        setName(foundUser.name);
      }
    }
    setLoggedIn(!!token);
  }, [token, users]);

  /**
   * Handles user logout by removing token from localStorage
   */
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      setLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="/" className="brand">
          V-comm
        </a>

        {/* User Greeting */}
        <div className="nav-n">
          Hello, <div className="nav-name">{name.toUpperCase()}</div>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          {/* Conditional Login/Logout Button */}
          {loggedIn ? (
            <Link to="/" className="nav-link" onClick={handleLogout}>
              <img src={logout} alt="Logout" className="icon" />
              Logout
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              <img src={login_icon} alt="Login" className="icon" />
              Login
            </Link>
          )}

          {/* Cart Link with Badge */}
          <Link to="/cart" className="nav-link cart-link">
            <img src={cart_icon} alt="Cart" className="icon" />
            Cart
            {loggedIn && totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </Link>

          {/* Orders Link */}
          <Link to="/orders" className="nav-link">
            <img src={package_icon} alt="Orders" className="icon" />
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// import React, { useEffect, useState } from 'react';
// import './styles/common.scss';
// import login_icon from '../../assets/user-interface.png';
// import logout from '../../assets/logout.png';
// import cart_icon from '../../assets/shopping-cart.png';
// import package_icon from '../../assets/package.png';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
// 	const token = useSelector((state) => state.signup.token || state.login.token);
// 	const users = useSelector((state) => state.signup.users);
// 	// const [token, setToken] = useState(localStorage.getItem('token'))
// 	const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
// 	// console.log(token);
// 	const [name, setName] = useState('not logged in');
// 	useEffect(() => {
// 		// console.log(token);
// 		console.log(token);
// 		console.log(users);

// 		const email = JSON.parse(token).email;

// 		const checkingUser = users.find((u) => u.email === email);
// 		console.log(checkingUser);

// 		if (checkingUser) {
// 			setName(checkingUser.name);
// 			console.log(checkingUser.name);
// 		} else {
// 			console.log('no name ');
// 		}
// 		// setName(token);
// 		setLoggedIn(!!token);
// 	}, [token, users]);

// 	const handleLogout = async () => {
// 		try {
// 			localStorage.removeItem('token');
// 			setLoggedIn(false);
// 		} catch (error) {
// 			console.error('Logout failed:', error);
// 		}
// 	};

// 	return (
// 		<div className="navbar">
// 			<div className="navbar-container">
// 				<a href="/" className="brand">
// 					V-comm
// 				</a>
// 				<div className="nav-n">
// 					Hello, <div className="nav-name">{name.toUpperCase()}</div>
// 				</div>
// 				<div className="nav-links">
// 					{loggedIn ? (
// 						<Link
// 							to="/"
// 							className="nav-link"
// 							onClick={() => {
// 								handleLogout();
// 							}}
// 						>
// 							<img src={logout} alt="Logout" className="icon" />
// 							Logout
// 						</Link>
// 					) : (
// 						<Link to="/login" className="nav-link">
// 							<img src={login_icon} alt="Login" className="icon" />
// 							Login
// 						</Link>
// 					)}

// 					<Link to="/cart" className="nav-link">
// 						<img src={cart_icon} alt="Cart" className="icon" />
// 						Cart
// 					</Link>
// 					<Link to="/" className="nav-link">
// 						<img src={package_icon} alt="order" className="icon" />
// 						Cart
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Navbar;
