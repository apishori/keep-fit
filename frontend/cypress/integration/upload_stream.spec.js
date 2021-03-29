describe('Upload Stream Tests', () => {
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
  cy.get('[style="padding-top: 16px;"] > :nth-child(1) > .r-flexDirection-eqz5dr').click()
	})

  it('can enter title', () => {
    cy.get('.r-pointerEvents-105ug2t > :nth-child(1) > :nth-child(1) > :nth-child(1) > .r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-flex-13awgt0.r-overflow-1udh08x > .r-flexDirection-1d5kdc7 > :nth-child(1) > .css-view-1dbjc4n.r-flex-13awgt0 > .r-paddingHorizontal-ymttw5 > .r-alignItems-1habvwh > :nth-child(1) > .css-view-1dbjc4n > [data-testid=RNE__Input__text-input]')
    .type('sample title')
  })

  it('can enter category', () => {
    cy.get('.r-pointerEvents-105ug2t > :nth-child(1) > :nth-child(1) > :nth-child(1) > .r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-flex-13awgt0.r-overflow-1udh08x > .r-flexDirection-1d5kdc7 > :nth-child(1) > .css-view-1dbjc4n.r-flex-13awgt0 > .r-paddingHorizontal-ymttw5 > .r-alignItems-1habvwh > :nth-child(2) > .css-view-1dbjc4n > [data-testid=RNE__Input__text-input]')
    .type('Y')
  })

  it('can access record stream', () => {
    cy.get('.r-pointerEvents-105ug2t > :nth-child(1) > :nth-child(1) > :nth-child(1) > .r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-flex-13awgt0.r-overflow-1udh08x > .r-flexDirection-1d5kdc7 > :nth-child(1) > .css-view-1dbjc4n.r-flex-13awgt0 > .r-paddingHorizontal-ymttw5 > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n')
    .click()
  })
})