import { BASE_URL } from 'consts'
import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.scss'

const Navbar: React.StatelessComponent = () => {
	return (
		<header>
			<nav>
				<ul>
					<li><Link to={BASE_URL}>dev/null</Link></li>
				</ul>
			</nav>
		</header>
	)
}
export default Navbar
