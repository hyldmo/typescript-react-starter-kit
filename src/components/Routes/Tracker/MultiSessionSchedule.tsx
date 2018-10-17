import Button, { ButtonBar } from 'components/Button'
import * as React from 'react'
import { Activity } from 'types'
import { calculateSet, range } from 'utils'

interface Props {
	activity: Activity
	weeks: number[]
}

type State = {
	activeWeek: number
}

export default class MultiSessionSchedule extends React.PureComponent<Props, State> {
	state = {
		activeWeek: 1
	}
	render () {
		const { activity, weeks } = this.props
		const { activeWeek } = this.state
		const sessions = range(1, activity.sessionsPerWeek)
		const sets = range(1, activity.intervalsPerSession)
		return (
			<>
				<ButtonBar>
					{weeks.map(week => (
						<Button key={week} active={activeWeek === week} onClick={_ => this.setState({ activeWeek: week })}>Week {week}</Button>
					))}
				</ButtonBar>
				<table>
					<thead>
						<tr>
							<th>{activity.name}</th>
							{sessions.map(day =>
								<th key={day}>Session {day}</th>
							)}
						</tr>
					</thead>
					<tbody>
						{sets.map(set =>
							<tr key={set}>
								<th>Set {set}</th>
								{sessions.map(day => (
									<td key={day}>{calculateSet(activity, day, set, activeWeek).total}</td>
								))}
							</tr>
						)}
						<tr>
							<th>Total</th>
							{sessions.map(day => (
								<td key={day}>{sets.reduce((a, set) => a + calculateSet(activity, day, set, activeWeek).total, 0)}</td>
							))}
						</tr>
					</tbody>
				</table>
			</>
		)
	}
}
