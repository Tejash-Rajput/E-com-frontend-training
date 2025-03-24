import React from 'react';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import { Outlet } from 'react-router-dom';
import './assets/app.scss';
const App = () => {
	return (
		<div>
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main-content">
				<Outlet />
			</div>

			<div className="footer">
				<Footer />
			</div>
		</div>
	);
};

export default App;
