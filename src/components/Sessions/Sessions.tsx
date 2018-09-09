import { Actions } from 'actions'
import { CURRENT_JZ } from 'consts'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SessionFilter, State as ReduxState } from 'types'
import { DateDiff, filterSessions } from 'utils'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

type State = {
	filter: SessionFilter
}

class Sessions extends React.Component<Props, State> {
	state = {
		filter: SessionFilter.open
	}

	componentDidMount () {
		this.props.fetchSessions(CURRENT_JZ)
	}

	render () {
		const { sessions: { sessions, status }, user } = this.props
		const { filter } = this.state

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
					<button onClick={() => this.setState({ filter: SessionFilter.open })}>Recent</button>
					<button onClick={() => this.setState({ filter: SessionFilter.mine })}>Mine</button>
					<button onClick={() => this.setState({ filter: SessionFilter.all })}>All</button>
					{filter === SessionFilter.open ? (
						<ul>
							{filterSessions(sessions, user, this.state.filter)
								.filter(sesh => new DateDiff(new Date(), sesh.endTime).hours() <= 1)
								.sort(({ startTime: a }, { startTime: b }) =>  a > b ? 1 : a < b ? -1 : 0)
								.map(sesh => (
								<li key={sesh.sessionId}>
									{sesh.startTime.toTimeString().slice(0, 5)}
									&nbsp;
									<Link to={`sessions/${sesh.sessionId}`}>{sesh.title}</Link>
								</li>
							))}
						</ul>
					) : filter === SessionFilter.mine ? (
						<ul>
							{filterSessions(sessions, user, filter).map(sesh => (
								<li key={sesh.sessionId}>
									<Link to={`sessions/${sesh.sessionId}`}>{sesh.title}</Link>
								</li>
							))}
						</ul>
					) : (
						<ul>
							{filterSessions(sessions, user, this.state.filter).map(sesh => (
								<li key={sesh.sessionId}>
									<Link to={`sessions/${sesh.sessionId}`}>{sesh.title}</Link>
								</li>
							))}
						</ul>
					)}
				</>
			)
		}
	}
}

const mapStateToProps = (state: ReduxState) => ({
	user: state.user,
	sessions: state.sessions
})

const dispatchToProps = {
	fetchSessions: Actions.fetchSessions
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Sessions)
