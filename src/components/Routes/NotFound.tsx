import React from 'react'
import { RouteComponentProps } from 'react-router'

const NotFound: React.FunctionComponent<RouteComponentProps<any>> = ({ location }) => (
	<div>
		<h1>No match for <code>{location.pathname}</code></h1>
	</div>
)

export default NotFound
