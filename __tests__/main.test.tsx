import * as React from 'react'
import * as renderer from 'react-test-renderer'

import '../__mocks__'

import App from '../src/components/App'

it('renders correctly', () => {
	renderer
		.create(<App />)
		.toJSON()
	// TODO (Optional): Turn on snapshot testing
	// expect(tree).toMatchSnapshot()
})
