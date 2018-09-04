import { Actions } from 'actions'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { State } from 'reducers'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class Sessions extends React.Component<Props> {
	componentDidMount () {
		this.props.fetchSessions(2018)
	}

	render (): JSX.Element {
		const { sessions, status } = this.props.sessions
		switch (status) {
			case 'loading': return (
				<h1>Loading</h1>
			)
			case 'error': return (
				<h1>Not able to fetch talks</h1>
			)
			case 'success': return (
				<>
					<h1>Talks</h1>
					<ol>
						{sessions && sessions.map(sesh => (
							<li key={sesh.sessionId}>
								<Link to={`sessions/${sesh.sessionId}`}>{sesh.title}</Link>
							</li>
						))}
					</ol>
				</>
			)
		}
	}
}

const mapStateToProps = (state: State) => ({
	sessions: state.sessions
})

const dispatchToProps = {
	fetchSessions: Actions.fetchSessions
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Sessions)
