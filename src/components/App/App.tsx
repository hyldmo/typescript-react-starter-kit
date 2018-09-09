import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import NotFound from 'components/NotFound'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import Sessions, { Session } from '../Sessions'

import { BASE_URL } from 'consts'
import './App.scss'

const App: React.StatelessComponent = () => (
	<>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path={`${BASE_URL}/`} component={Sessions} />
				<Route exact path={`${BASE_URL}/sessions`} component={Sessions} />
				<Route exact path={`${BASE_URL}/sessions/:id`} component={Session} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</>
)

export default hot(module)(App)
