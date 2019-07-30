import { Actions } from 'actions'
import cn from 'classnames'
import Button, { ButtonBar } from 'components/Button'
import React from 'react'
import { connect } from 'react-redux'
import { Activity, State as ReduxState } from 'types'
import { activitySchema, Joi, range } from 'utils'
import MultiSessionSchedule from './MultiSessionSchedule'
import SingleSessionSchedule from './SingleSessionSchedule'

import './Tracker.less'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

type State = {
	name: string
	max: string
	currentActivity: Activity['name'] | null
	intervalsPerSession: string
	sessionsPerWeek: string
}

const initialForm: Omit<State, 'currentActivity'> = {
	name: '',
	max: '',
	intervalsPerSession: '',
	sessionsPerWeek: ''
}

class Tracker extends React.Component<Props, State> {
	state: State = {
		...initialForm,
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
		this.setState(initialForm)
	}

	onInputChange = (name: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
		// Have to cast here as { [name] } construct widens the keyof type to string
		// tslint:disable-next-line:no-object-literal-type-assertion
		this.setState({ [name]: e.target.value } as Pick<State, typeof name>)
	}

	render () {
		const { name, max, intervalsPerSession, sessionsPerWeek } = this.state
		const { activities } = this.props

		const currentActivity = activities.find(a => a.name === this.state.currentActivity) || activities[0]
		const weeks = range(1, 8)
		return (
			<div className={cn('tracker', { empty: activities.length === 0 })}>
				<h1>Exercise Tracker</h1>
				<fieldset className="add-activity">
					<legend>Add activity</legend>
					<label>
						The name of the activity
						<input name="name" type="text" value={name} onChange={this.onInputChange('name')} placeholder="Name" />
					</label>
					<label>
						Your current record (e.g 50 if you can do max 50 situps in a row)
						<input name="max" type="number" value={max} onChange={this.onInputChange('max')} placeholder="Record"/>
					</label>
					<label>
						The amount of intervals you want to do per exercise session
						<input name="intervalsPerSession" type="number" value={intervalsPerSession} onChange={this.onInputChange('intervalsPerSession')} placeholder="Intervals"/>
					</label>
					<label>
						Amount of sessions per week
						<input name="sessionsPerWeek" type="number" value={sessionsPerWeek} onChange={this.onInputChange('sessionsPerWeek')} placeholder="Sessions"/>
					</label>
					<Button onClick={this.addActivity} disabled={Joi.validate(this.state, activitySchema, { allowUnknown: true }).error !== null}>Add</Button>
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
