import { Actions } from 'actions'
import React from 'react'
import { connect } from 'react-redux'
import { Activity, State as ReduxState } from 'types'
import { calculateSet } from 'utils'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

type State = {
	name: string
	max: string
	currentActivity: Activity['name'] | null
}

class Tracker extends React.Component<Props, State> {
	state: State = {
		name: '',
		max: '',
		currentActivity: null
	}

	addActivity = () => {
		this.props.addActivity({
			name: this.state.name,
			startDate: new Date(),
			max: Number.parseInt(this.state.max, 10),
			intervalsPerSession: 5,
			sessionsPerWeek: 3
		})
		this.setState({ name: '', max: '' })
	}

	render () {
		const { name, max } = this.state
		const { activities } = this.props

		const currentActivity = activities.find(a => a.name === this.state.currentActivity) || activities[0]
		const weeks = new Array(8).fill(0).map((_, i) => i + 1)
		return (
			<>
				<h1>Tracker</h1>
				<fieldset>
					<legend>Add activity</legend>
					<input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} placeholder="Activity name" />
					<input type="number" value={max} onChange={e => this.setState({ max: e.target.value })} placeholder="Current record"/>
					<button onClick={this.addActivity} disabled={Number.isNaN(Number.parseFloat(max))}>Add</button>
				</fieldset>
				{activities.length > 0 && <>
					<hr />
					<div className="buttons">
						{activities.map(activity => (
							<button key={activity.name}>{activity.name}</button>
						))}
					</div>
					<hr />
				</>}

				{currentActivity && <>
					<h2>Schedule</h2>
					<table>
						<thead>
							<tr>
								<th>{currentActivity.name}</th>
								{weeks.map(week =>
									<th key={week}>Week {week}</th>
								)}
							</tr>
						</thead>
						<tbody>
							{new Array(currentActivity.intervalsPerSession).fill(0).map((_, i) => i + 1).map((set) =>
								<tr key={set}>
									<td>Set {set}</td>
									{weeks.map(week => (
										<td key={week}>{calculateSet(currentActivity, set, week)}</td>
									))}
								</tr>
							)}
						</tbody>
					</table>
				</>}
			</>
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
