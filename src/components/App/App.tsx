import { About, Home, NotFound, Tracker } from 'components/Routes'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

import './App.less'

const App: React.FunctionComponent = () => (
	<>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/tracker" component={Tracker} />
				<Route exact path="/about" component={About} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</>
)

export default hot(module)(App)
