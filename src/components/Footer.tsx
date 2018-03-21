import * as React from 'react'

const Footer: React.StatelessComponent = (props) =>  (
	<footer>
		<span>
			{(process.env.PACKAGE_NAME as string)
				.split('-')
				.map(name => name.charAt(0).toUpperCase() + name.slice(1))
				.join(' ')}
			&nbsp;{process.env.PACKAGE_VERSION}
		</span>
	</footer>
)

export default Footer
