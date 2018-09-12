import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import NotFound from 'components/NotFound'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import Sessions, { Session } from '../Sessions'

import { BASE_URL } from 'consts'
import './App.scss'

let baseUrl = BASE_URL
if (baseUrl.endsWith('/'))
	baseUrl = baseUrl.slice(0, -1)

const App: React.StatelessComponent = () => (
	<>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path={`${baseUrl}/`} component={Sessions} />
				<Route exact path={`${baseUrl}/sessions`} component={Sessions} />
				<Route exact path={`${baseUrl}/sessions/:id`} component={Session} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</>
)

export default hot(module)(App)
