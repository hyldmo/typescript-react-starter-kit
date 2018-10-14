import cn from 'classnames'
import * as React from 'react'

import css from './ButtonBar.scss'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const Button: React.SFC<Props> = ({ className, children, ...rest }) => (
	<div className={cn(css.buttonbar, className)} {...rest}>
		{children}
	</div>
)

export default Button
