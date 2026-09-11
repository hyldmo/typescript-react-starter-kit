import type { FC } from 'react'
import { snakeToCamel } from '~/utils'

const Footer: FC = () => (
	<footer className="border-neutral-200 border-t py-4 text-neutral-500 text-sm">
		<span>
			{snakeToCamel(import.meta.env.VITE_APP_NAME)} {import.meta.env.VITE_APP_VERSION}
		</span>
	</footer>
)

export default Footer
