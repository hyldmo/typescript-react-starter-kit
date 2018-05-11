import { Actions } from 'actions'
import React from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'
import { State } from 'reducers'

const mapStateToProps = (state: State) => ({
	version: state.version
})

const dispatchToProps = {
	fetchVersion: Actions.fetchVersion
}

const stateProps = returntypeof(mapStateToProps)
type Props = typeof stateProps & typeof dispatchToProps

class Version extends React.Component<Props> {
	componentDidMount () {
		this.props.fetchVersion('https://raw.githubusercontent.com/hyldmo/typescript-react-starter-kit/master/package.json')
	}

	render () {
		return (
			<h1>
				Version: {this.props.version}
			</h1>
		)
	}
}

export default connect(
	mapStateToProps,
	dispatchToProps
)(Version)
