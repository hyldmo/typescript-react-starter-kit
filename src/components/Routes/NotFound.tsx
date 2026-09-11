import type { FC } from 'react'
import { useLocation } from 'react-router-dom'

const NotFound: FC = () => {
	const location = useLocation()
	return (
		<div>
			<h1 className="font-bold text-2xl">
				No match for <code>{location.pathname}</code>
			</h1>
		</div>
	)
}

export default NotFound
