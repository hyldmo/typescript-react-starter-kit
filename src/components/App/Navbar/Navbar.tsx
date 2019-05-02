import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.less'

const Navbar: React.StatelessComponent = () => {
	return (
		<header>
			<nav>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/tracker">Tracker</Link></li>
					<li><Link to="/about">About</Link></li>
				</ul>
			</nav>
		</header>
	)
}
export default Navbar
