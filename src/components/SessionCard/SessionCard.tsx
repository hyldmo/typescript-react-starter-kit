import { BASE_URL } from 'consts'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Session } from 'types'

import css from './SessionCard.scss'

type Props = {
	session: Session
}

const SessionCard: React.SFC<Props> = ({ session }) => (
	<Link className={css.session} to={`${BASE_URL}/sessions/${session.sessionId}`} >
		{session.title}
	</Link>
)

export default SessionCard
