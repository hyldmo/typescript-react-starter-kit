import Footer from 'components/Footer'
import Home from 'components/Home'
import Navbar from 'components/Navbar'
import NotFound from 'components/NotFound'
import React from 'react'
import { Route, Switch } from 'react-router'

import Sessions, { Session } from '../Sessions'

const App: React.StatelessComponent = () => (
	<>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/sessions" component={Sessions} />
				<Route exact path="/sessions/:id" component={Session} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</>
)

export default App
