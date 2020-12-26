import React from 'react'
import { snakeToCamel } from 'utils'

const Footer: React.FunctionComponent = () =>  (
	<footer>
		<span>
			{snakeToCamel(process.env.PACKAGE_NAME as string)}
			&nbsp;{process.env.PACKAGE_VERSION}
		</span>
	</footer>
)

export default Footer
