import { Actions } from 'actions'
import Button, { ButtonBar } from 'components/Button'
import React from 'react'
import { connect } from 'react-redux'
import { Activity, State as ReduxState } from 'types'
import { range } from 'utils'
import MultiSessionSchedule from './MultiSessionSchedule'
import SingleSessionSchedule from './SingleSessionSchedule'

import css from './Tracker.scss'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

type State = {
	name: string
	max: string
	currentActivity: Activity['name'] | null
	intervalsPerSession: string
	sessionsPerWeek: string
}

class Tracker extends React.Component<Props, State> {
	state: State = {
		name: '',
		max: '',
		intervalsPerSession: '',
		sessionsPerWeek: '',
		currentActivity: null
	}

	addActivity = () => {
		const { name, max, intervalsPerSession, sessionsPerWeek } = this.state
		this.props.addActivity({
			name,
			startDate: new Date(),
			max: Number.parseInt(max, 10),
			intervalsPerSession: Number.parseInt(intervalsPerSession, 10),
			sessionsPerWeek: Number.parseInt(sessionsPerWeek, 10)
		})
		this.setState({ name: '', max: '' })
	}

	render () {
		const { name, max, intervalsPerSession, sessionsPerWeek } = this.state
		const { activities } = this.props

		const currentActivity = activities.find(a => a.name === this.state.currentActivity) || activities[0]
		const weeks = range(1, 8)
		return (
			<div className={css.tracker}>
				<h1>Tracker</h1>
				<fieldset>
					<legend>Add activity</legend>
					<input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} placeholder="Activity name" />
					<input type="number" value={max} onChange={e => this.setState({ max: e.target.value })} placeholder="Current record"/>
					<input type="number" value={intervalsPerSession} onChange={e => this.setState({ intervalsPerSession: e.target.value })} placeholder="Intervals per session"/>
					<input type="number" value={sessionsPerWeek} onChange={e => this.setState({ sessionsPerWeek: e.target.value })} placeholder="Sessions per week"/>
					<Button onClick={this.addActivity} disabled={Number.isNaN(Number.parseFloat(max))}>Add</Button>
				</fieldset>
				{activities.length > 1 && <>
					<h2>Activity</h2>
					<ButtonBar>
						{activities.map(activity => (
							<Button
								key={activity.name}
								active={activity.name === currentActivity.name}
								onClick={_ => this.setState({ currentActivity: activity.name })}
							>
								{activity.name}
							</Button>
						))}
					</ButtonBar>
				</>}

				{currentActivity && <>
					<h2>Schedule</h2>
					{currentActivity.sessionsPerWeek > 1 ? (
						<MultiSessionSchedule activity={currentActivity} weeks={weeks} />
					) : (
						<SingleSessionSchedule activity={currentActivity} weeks={weeks} />
					)}
				</>}
			</div>
		)
	}
}

const mapStateToProps = (state: ReduxState) => ({
	...state.tracker
})

const dispatchToProps = {
	addActivity: Actions.addActivity
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Tracker)
