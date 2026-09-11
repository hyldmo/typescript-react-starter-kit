import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import { cn } from '~/utils'

export interface ButtonBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: ReactNode
}

const ButtonBar: FC<ButtonBarProps> = ({ className, children, ...rest }) => (
	<div className={cn('flex flex-wrap gap-2', className)} {...rest}>
		{children}
	</div>
)

export default ButtonBar
