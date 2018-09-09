import SessionCard from 'components/SessionCard'
import * as React from 'react'
import { Session } from 'types'
import { groupBy } from 'utils'
type Props = {
	sessions: Session[]
	heading?: JSX.Element
}

const SessionsByDate: React.SFC<Props> = ({ sessions, heading = <h2 /> }) => (
	<div>
		{groupBy(sessions, 'startTime').map(([key, values]) => (
			<React.Fragment key={key.toString()}>
				<heading.type>{new Date(key).toTimeString().slice(0, 5)}</heading.type>
				<ul>
					{values.map(sesh => (
						<li key={sesh.sessionId}>
							<SessionCard session={sesh}/>
						</li>
					))}
				</ul>
			</React.Fragment>
		))}
	</div>
)

export default SessionsByDate
