import cn from 'classnames'
import * as React from 'react'

import './Button.less'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	active?: boolean
}

const Button: React.SFC<Props> = ({ active, className, children, ...rest }) => (
	<button className={cn('button', className, { active })} {...rest}>
		{children}
	</button>
)

export default Button
