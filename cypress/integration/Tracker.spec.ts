import { Activity } from '../../src/types/tracker'

const addActivity = (activity: Partial<Activity>) => {
	Object.entries(activity).forEach(([key, value]) => {
		cy.get(`input[name=${key}]`).type((value || '').toString())
	})
	cy.get('@submit').click()
}

describe('Tracker', () => {
	beforeEach(() => {
		cy.clearLocalStorage()
		cy.visit('/tracker')
		cy.get('fieldset button').as('submit')
	})

	it('shows the title of the page', () => {
		cy.get('h1').contains('Tracker')
	})

	it('can add activity', () => {
		cy.fixture('activity.json').then((activity: Activity) => {
			addActivity(activity)
			cy.get('table').should('exist')
		})
	})

	it('disables submit until all fields are filled', () => {
		cy.fixture('activity.json').then((activity: Activity) => {
			Object.entries(activity).forEach(([key, value]) => {
				cy.get('fieldset button').should('be.disabled')
				cy.get(`input[name=${key}]`).type((value || '').toString())
			})
			cy.get('@submit').should('not.be.disabled')
		})
	})

	it('clears all input fields after submit', () => {
		cy.fixture('activity.json').then((activity: Activity) => {
			addActivity(activity)
			Object.entries(activity).forEach(([key]) => {
				cy.get(`input[name=${key}]`).should('have.value', '')
			})
		})
	})

	it('shows all weeks in one table when sessionsPerWeek is 1', () => {
		addActivity({ name: 'Situps', max: 40, intervalsPerSession: 5, sessionsPerWeek: 1 })
		cy.get('table').should('exist')
		cy.get('.buttonbar').should('not.exist')
	})

	it('shows Week menu when sessionsPerWeek is > 1', () => {
		addActivity({ name: 'Situps', max: 40, intervalsPerSession: 5, sessionsPerWeek: 3 })
		cy.get('table').should('exist')
		cy.get('.buttonbar').should('exist')
	})
})
