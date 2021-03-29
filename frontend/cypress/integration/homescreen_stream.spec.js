describe('Homescreen Stream Tests', () => {
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

  it('can load streams', () => {
    cy.get('[style="padding-top: 16px;"] > .r-WebkitOverflowScrolling-150rngu')
    .find(':nth-child(1)')
    .find(':nth-child(2)')
  })

  it('can go to stream page', () => {
  	// try first stream
    cy.get(':nth-child(1) > .r-cursor-1loqt21 > .r-flexDirection-eqz5dr').click()
    cy.get('[data-testid=header-back]').click()
    // try second stream
    cy.get('.r-WebkitOverflowScrolling-150rngu > :nth-child(1) > :nth-child(2) > .r-cursor-1loqt21 > .r-flexDirection-eqz5dr').click()
    cy.get('[data-testid=header-back]').click()
  })
})