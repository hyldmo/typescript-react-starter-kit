import * as React from 'react'
import * as renderer from 'react-test-renderer'

import '../__mocks__/matchMedia'

import App from '../src/containers/App'
import Root from '../src/containers/Root'

it('renders correctly', () => {
	renderer.create(
			<Root>
				<App/>
			</Root>
		)
		.toJSON()
	// TODO: Turn on snapshot testing
	// expect(tree).toMatchSnapshot()
})
