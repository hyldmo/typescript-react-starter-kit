import * as React from 'react'
import * as renderer from 'react-test-renderer'

import '../__mocks__'

import Root from '../src/containers/Root'

it('renders correctly', () => {
	renderer
		.create(<Root />)
		.toJSON()
	// TODO (Optional): Turn on snapshot testing
	// expect(tree).toMatchSnapshot()
})
