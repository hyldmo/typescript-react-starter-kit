import * as React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'
import { Route, Switch } from 'react-router'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import NotFound from '../components/NotFound'
import { State } from '../reducers'

import Version from './Version'

const mapStateToProps = (state: State) => ({
	pathname: state.routing.location.pathname
})

const dispatchToProps = {
}

const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps

const App: React.StatelessComponent<Props> = () => (
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

export default connect(
	mapStateToProps,
	dispatchToProps
)(App)
