import * as React from 'react'
import { Route, Switch } from 'react-router'
import Footer from '../Footer'
import Home from '../Home'
import Navbar from '../Navbar'
import NotFound from '../NotFound'

import Version from '../Version'

const App: React.StatelessComponent = () => (
	<>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/version" component={Version} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</>
)

export default App
