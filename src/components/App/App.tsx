import Footer from 'components/Footer'
import Home from 'components/Home'
import Navbar from 'components/Navbar'
import NotFound from 'components/NotFound'
import React from 'react'
import { Route, Switch } from 'react-router'

import About from 'components/About'

import './App.scss'

const App: React.StatelessComponent = () => (
	<>
		<Navbar/>
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route component={NotFound}/>
			</Switch>
		</main>
		<Footer />
	</>
)

export default App
