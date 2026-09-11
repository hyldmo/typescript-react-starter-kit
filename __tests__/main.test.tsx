import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Root from '../src/components/App'

test('renders the home page', () => {
	render(<Root />)
	expect(screen.getByText('Hello world')).toBeInTheDocument()
})
