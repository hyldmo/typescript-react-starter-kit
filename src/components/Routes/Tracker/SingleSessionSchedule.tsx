import * as React from 'react'
import { Activity } from 'types'
import { calculateSet, range } from 'utils'

interface Props {
	activity: Activity
	weeks: number[]
}

const SingleSessionSchedule: React.SFC<Props> = ({ activity, weeks }) =>  (
	<>
		<table>
			<thead>
				<tr>
					<th>{activity.name}</th>
					{weeks.map(week =>
						<th key={week}>Week {week}</th>
					)}
				</tr>
			</thead>
			<tbody>
				{range(1, activity.intervalsPerSession).map(set =>
					<tr key={set}>
						<th>Set {set}</th>
						{weeks.map(week => (
							<td key={week}>{calculateSet(activity, 1, set, week).total}</td>
						))}
					</tr>
				)}
			</tbody>
		</table>
	</>
)

export default SingleSessionSchedule
