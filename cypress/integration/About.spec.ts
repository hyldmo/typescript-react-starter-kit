describe('About', () => {
	beforeEach(() => {
		cy.visit('/about')
	})

	it('has a title', () => {
		cy.get('h1').contains('About')
	})

	it('shows the version number', () => {
		cy.get('h2').contains('Version')
	})
})
