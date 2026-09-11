import { type FC, useState } from 'react'
import Button, { ButtonBar } from '~/components/Button'
import type { Activity } from '~/types'
import { calculateSet, range } from '~/utils'

export interface MultiSessionScheduleProps {
	activity: Activity
	weeks: number[]
}

const MultiSessionSchedule: FC<MultiSessionScheduleProps> = ({ activity, weeks }) => {
	const [activeWeek, setActiveWeek] = useState(1)
	const sessions = range(1, activity.sessionsPerWeek)
	const sets = range(1, activity.intervalsPerSession)
	return (
		<>
			<ButtonBar>
				{weeks.map(week => (
					<Button key={week} active={activeWeek === week} onClick={() => setActiveWeek(week)}>
						Week {week}
					</Button>
				))}
			</ButtonBar>
			<table className="mt-4 border-collapse text-sm">
				<thead>
					<tr>
						<th className="border border-neutral-300 px-2 py-1 text-left">{activity.name}</th>
						{sessions.map(session => (
							<th key={session} className="border border-neutral-300 px-2 py-1">
								Session {session}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{sets.map(set => (
						<tr key={set}>
							<th className="border border-neutral-300 px-2 py-1 text-left">Set {set}</th>
							{sessions.map(session => (
								<td
									key={session}
									className="border border-neutral-300 px-2 py-1 text-right tabular-nums"
								>
									{calculateSet(activity, session, set, activeWeek).total}
								</td>
							))}
						</tr>
					))}
					<tr>
						<th className="border border-neutral-300 px-2 py-1 text-left">Total</th>
						{sessions.map(session => (
							<td key={session} className="border border-neutral-300 px-2 py-1 text-right tabular-nums">
								{sets.reduce((a, set) => a + calculateSet(activity, session, set, activeWeek).total, 0)}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default MultiSessionSchedule
