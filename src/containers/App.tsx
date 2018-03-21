import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import NotFound from '../components/NotFound'

import Version from './Version'

const App: React.StatelessComponent = () => (
	<div>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/version" component={Version} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</div>
)

export default hot(module)(App)
