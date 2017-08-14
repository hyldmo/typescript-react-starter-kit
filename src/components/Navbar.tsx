import * as React from 'react'
import { Link } from 'react-router-dom'

import '../styles/navbar.pcss'

const Navbar: React.StatelessComponent = () => {
	return (
		<header>
			<nav>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/version">Version</Link></li>
				</ul>
			</nav>
		</header>
	)
}
export default Navbar
