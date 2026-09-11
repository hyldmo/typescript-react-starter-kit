import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './components/App'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Missing #root element')
createRoot(rootEl).render(
	<StrictMode>
		<Root />
	</StrictMode>
)
