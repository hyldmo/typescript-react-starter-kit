import type { FC } from 'react'
import type { Activity } from '~/types'
import { calculateSet, range } from '~/utils'

export interface SingleSessionScheduleProps {
	activity: Activity
	weeks: number[]
}

const SingleSessionSchedule: FC<SingleSessionScheduleProps> = ({ activity, weeks }) => (
	<table className="border-collapse text-sm">
		<thead>
			<tr>
				<th className="border border-neutral-300 px-2 py-1 text-left">{activity.name}</th>
				{weeks.map(week => (
					<th key={week} className="border border-neutral-300 px-2 py-1">
						Week {week}
					</th>
				))}
			</tr>
		</thead>
		<tbody>
			{range(1, activity.intervalsPerSession).map(set => (
				<tr key={set}>
					<th className="border border-neutral-300 px-2 py-1 text-left">Set {set}</th>
					{weeks.map(week => (
						<td key={week} className="border border-neutral-300 px-2 py-1 text-right tabular-nums">
							{calculateSet(activity, 1, set, week).total}
						</td>
					))}
				</tr>
			))}
		</tbody>
	</table>
)

export default SingleSessionSchedule
