import { Actions } from 'actions'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { State } from 'types'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

const About: React.FunctionComponent<Props> = ({ version, fetchVersion }) => {
	useEffect(() => {
		fetchVersion('https://raw.githubusercontent.com/hyldmo/typescript-react-starter-kit/master/package.json')
	})

	return (
		<>
			<h1>About {process.env.PACKAGE_NAME}</h1>
			<h2></h2>
			<h2>
				Version: {version}
			</h2>
		</>
	)
}

const mapStateToProps = (state: State) => ({
	version: state.version
})

const dispatchToProps = {
	fetchVersion: Actions.fetchVersion
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(About)
