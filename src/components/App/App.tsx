import Home from 'components/Home'
import NotFound from 'components/NotFound'
import Tracker from 'components/Tracker'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

import About from 'components/About'

import './App.scss'

const App: React.StatelessComponent = () => (
	<>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/tracker" component={Tracker} />
				<Route exact path="/aboout" component={About} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</>
)

export default hot(module)(App)
