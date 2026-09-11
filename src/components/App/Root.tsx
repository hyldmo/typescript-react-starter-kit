import type { FC } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../configureStore'
import App from './App'

// basename follows the Vite base: `/` on Workers, `/<repo>/` on GH Pages.
const Root: FC = () => (
	<Provider store={store}>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<App />
		</BrowserRouter>
	</Provider>
)

export default Root
