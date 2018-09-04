import { Actions } from 'actions'
import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { State } from 'reducers'

import * as classnames from './Session.scss'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps & RouteComponentProps<{ id: string }>

class Session extends React.Component<Props> {
	state = {
		stars: 0,
		feedback: ''
	}
	componentDidMount () {
		this.props.fetchSessions(2018)
	}

	onFeedbackEntered = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({ feedback: e.target.value })
	}

	handleStarClick (n: number) {
		this.setState({ stars: n })
	}

	render (): JSX.Element {
		const { session } = this.props
		const { feedback, stars } = this.state
		if (!session) return <h1>Session not found</h1>

		return (
			<div className="session">
				<h1>{session.title}</h1>
				<h2>Give feedback</h2>
				<div>
					{[...Array(5)].map((_, i) => (
						<button
							key={i}
							aria-label={`${i + 1} star`}
							className={classnames.star}
							onClick={() => this.handleStarClick(i + 1)}>
							<svg viewBox="0 0 51 48" className={stars > i ? classnames.filled : ''}>
								<path stroke="#000" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
							</svg>
						</button>)
					)}
				</div>
				<textarea onChange={this.onFeedbackEntered} value={feedback} />
				<button>Send</button>
			</div>
		)
	}
}

const mapStateToProps = (state: State, ownProps: RouteComponentProps<{ id: string }>) => {
	const { sessions } = state.sessions
	return {
		session: sessions && sessions.find(sesh => sesh.sessionId === ownProps.match.params.id)
	}
}

const dispatchToProps = {
	fetchSessions: Actions.fetchSessions
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Session)
