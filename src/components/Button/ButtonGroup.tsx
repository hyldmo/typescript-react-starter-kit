import * as React from 'react'

import css from './Button.scss'

const ButtonGroup: React.SFC = ({ children }) => (
	<div className={css.buttongroup}>
		{children}
	</div>
)

export default ButtonGroup
