import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { About, Home, NotFound, Tracker } from '~/components/Routes'
import Footer from './Footer'
import Navbar from './Navbar'

const App: FC = () => (
	<div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4">
		<Navbar />
		<main className="flex-1 py-6">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tracker" element={<Tracker />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</main>
		<Footer />
	</div>
)

export default App
