describe('Upload Post Tests', () => {
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
  
  // navigate to upload post page
  cy.get('[href="/Keep-Fit/upload"]').click()
	})

  it('can enter title', () => {
    cy.get('.r-paddingHorizontal-ymttw5 > .r-alignItems-1habvwh > :nth-child(1) > .css-view-1dbjc4n > [data-testid=RNE__Input__text-input]')
    .type('sample title')
  })

  it('can enter category', () => {
    cy.get('.r-paddingHorizontal-ymttw5 > .r-alignItems-1habvwh > :nth-child(2) > .css-view-1dbjc4n > [data-testid=RNE__Input__text-input]')
    .type('Y')
  })

  it('can record video', () => {
    cy.get('.r-alignItems-1habvwh > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n > .css-text-901oao')
    .click()
  })
})