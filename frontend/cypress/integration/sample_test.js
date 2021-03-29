describe('Homescreen Post Tests', () => {
	beforeEach(() => {
	// run these tests as if in a mobile browser
	// and ensure our responsive UI is correct
	cy.viewport('iphone-7')
	cy.visit('http://localhost:19006/')

	  // log in to test account first
	cy.get(':nth-child(1) > .css-view-1dbjc4n > [data-testid=RNE__Input__text-input]')
	  .type('TEST')
	cy.get(':nth-child(2) > .css-view-1dbjc4n > [data-testid=RNE__Input__text-input]')
	  .type('sam123')
	cy.get(':nth-child(1) > .css-cursor-18t94o4 > .css-view-1dbjc4n').click()
	})

  it('can load posts', () => {
    cy.get('.r-flex-13awgt0.r-overflow-1udh08x')
  })
})