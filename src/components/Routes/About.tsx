import { Actions } from 'actions'
import React from 'react'
import { connect } from 'react-redux'
import { State } from 'types'

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class About extends React.Component<Props> {
	state = {
		showBox: false
	}

	componentDidMount () {
		this.props.fetchVersion('https://raw.githubusercontent.com/hyldmo/typescript-react-starter-kit/master/package.json')
		setTimeout(() => this.setState({ showBox: true }), 10 * 1000)
	}

	render () {
		const { showBox } = this.state
		return (
			<>
				<h1>About {process.env.PACKAGE_NAME}</h1>
				<h2></h2>
				<h2>
					Version: {this.props.version}
				</h2>
				{showBox && <textarea className="messagebox"></textarea>}
			</>
		)
	}
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
