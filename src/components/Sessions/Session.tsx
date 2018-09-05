import { Actions } from 'actions'
import StarRating from 'components/StarRating'
import { CURRENT_JZ } from 'consts'
import { DEVNULL_URL } from 'consts'
import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Feedback, FeedbackResponse, State as ReduxState } from 'types'
import { api, capitalize, computeOverallRating, omit, pick } from 'utils'

import * as classnames from './Session.scss'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps & RouteComponentProps<{ id: string }>

type State = Feedback

class Session extends React.Component<Props, Feedback> {
	state = {
		overall: 0,
		relevance: 0,
		content: 0,
		quality: 0,
		comments: ''
	}
	async componentDidMount () {
		const { fetchSessions, session, match, user } = this.props
		if (!session)
			fetchSessions(CURRENT_JZ)

		const response = await api(`${DEVNULL_URL}/events/${CURRENT_JZ.id}/sessions/${match.params.id}/feedbacks`, {
			headers: new Headers({ 'Voter-ID': user as string })
		})
		const body: FeedbackResponse = await response.json()

		this.setState({
			...omit(body.session.online, 'count'),
			comments: body.comments[0]
		})
	}

	onFeedbackEntered: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
		this.setState({ comments: e.target.value })
	}

	handleStarClick = (n: number, name: keyof State) => {
		const entry = { [name]: n } as object // TODO: Switch to more specific cast or remove altogether
		this.setState(entry)
	}

	handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		if (!this.props.session)
			throw new Error('Session not found')

		this.props.submitFeedback(this.state, this.props.session.sessionId)
	}

	render (): JSX.Element {
		const { session } = this.props
		const { comments, relevance, content, quality } = this.state
		if (!session) return <h1>Session not found</h1>

		return (
			<div className={classnames.session}>
				<h1>{session.title}</h1>
				<table>
					<tbody>
					{Object.entries(pick(session, 'speakers', 'language', 'format')).map(([key, value]) => (
						<tr key={key}>
							<th>{capitalize(key)}</th>
							<td>{capitalize(value)}</td>
						</tr>
					))}
					</tbody>
				</table>
				<h2>Give feedback</h2>
				<form onSubmit={this.handleSubmit}>
					{Object.entries(omit(this.state, 'comments', 'overall')).map(([key, value]) => (
						<React.Fragment key={key}>
							<h3>{capitalize(key)}</h3>
							<StarRating name={key} stars={value} totalStars={5} onClick={this.handleStarClick} />
						</React.Fragment>
					))}

					<h3>Overall</h3>
					<StarRating name={'overall'} stars={computeOverallRating(relevance, content, quality)} totalStars={5} onClick={this.handleStarClick} readonly />

					<h3>Comments</h3>
					<textarea name="feedback" rows={5} onChange={this.onFeedbackEntered} value={comments} />
					<button type="submit">Send</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state: ReduxState, ownProps: RouteComponentProps<{ id: string }>) => {
	const { sessions } = state.sessions
	return {
		user: state.user,
		session: sessions && sessions.find(sesh => sesh.sessionId === ownProps.match.params.id)
	}
}

const dispatchToProps = {
	fetchSessions: Actions.fetchSessions,
	fetchFeedback: Actions.fetchFeedback,
	submitFeedback: Actions.submitFeedback
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Session)
