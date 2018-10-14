import cn from 'classnames'
import * as React from 'react'

import css from './Button.scss'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	active?: boolean
}

const Button: React.SFC<Props> = ({ active, className, children, ...rest }) => (
	<button className={cn(css.button, className, { [css.active]: active })} {...rest}>
		{children}
	</button>
)

export default Button
