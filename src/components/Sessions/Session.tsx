import { Actions } from 'actions'
import StarRating from 'components/StarRating'
import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { State as ReduxState } from 'reducers'
import { Feedback } from 'types'
import { capitalize, computeOverallRating, omit, pick } from 'utils'

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
	componentDidMount () {
		this.props.fetchSessions(2018)
	}

	onFeedbackEntered: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
		this.setState({ comments: e.target.value })
	}

	handleStarClick = (n: number, name: keyof State) => {
		const entry = { [name]: n } as object // TODO: Switch to more specific cast or remove altogether

		console.log(n, entry)
		this.setState(entry)
	}

	handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		this.props.submitFeedback(this.state)
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
							<td>{capitalize(key)}</td>
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
		session: sessions && sessions.find(sesh => sesh.sessionId === ownProps.match.params.id)
	}
}

const dispatchToProps = {
	fetchSessions: Actions.fetchSessions,
	submitFeedback: Actions.submitFeedback
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Session)
