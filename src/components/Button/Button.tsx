import cn from 'classnames'
import * as React from 'react'

import css from './Button.scss'

type Props = React.HTMLProps<HTMLButtonElement> & {
	active?: boolean
}

const Button: React.SFC<Props> = ({ active, ...props }) => (
	<button {...props} className={cn(css.button, props.className, { [css.active]: active })} />
)

export default Button
