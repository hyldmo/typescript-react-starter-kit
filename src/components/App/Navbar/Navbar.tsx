import type { FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => (
	<header className="border-neutral-200 border-b py-4">
		<nav>
			<ul className="flex gap-4">
				<li>
					<Link className="hover:underline" to="/">
						Home
					</Link>
				</li>
				<li>
					<Link className="hover:underline" to="/tracker">
						Tracker
					</Link>
				</li>
				<li>
					<Link className="hover:underline" to="/about">
						About
					</Link>
				</li>
			</ul>
		</nav>
	</header>
)

export default Navbar
