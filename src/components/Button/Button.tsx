import type { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import { cn } from '~/utils'

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	active?: boolean
	children?: ReactNode
}

const Button: FC<ButtonProps> = ({ active, className, children, type = 'button', ...rest }) => (
	<button
		type={type}
		className={cn(
			'rounded border border-neutral-300 bg-white px-3 py-1 text-sm hover:bg-neutral-100 disabled:opacity-50',
			active && 'border-neutral-900 bg-neutral-900 text-white',
			className
		)}
		{...rest}
	>
		{children}
	</button>
)

export default Button
