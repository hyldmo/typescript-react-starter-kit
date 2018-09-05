import { Actions } from 'actions'
import { CURRENT_JZ } from 'consts'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { State } from 'types'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class Sessions extends React.Component<Props> {
	componentDidMount () {
		this.props.fetchSessions(CURRENT_JZ)
	}

	render (): JSX.Element {
		const { sessions, status } = this.props.sessions
		switch (status) {
			case 'loading': return (
				<h1>Loading...</h1>
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
