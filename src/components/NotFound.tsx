import * as React from 'react'
import { RouteProps } from 'react-router'

const NotFound: React.StatelessComponent<RouteProps> = ({ location }) => (
	<div>
		<h1>No match for <code>{location.pathname}</code></h1>
	</div>
)

export default NotFound
