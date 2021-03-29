describe('Post Like Tests', () => {
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
  
  // navigate to first post on feed 
  cy.get(':nth-child(1) > .r-cursor-1loqt21 > [style="margin-bottom: 10px;"]').click()
	})

  it('can load like button', () => {
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n')
  })

  it('can like post', () => {
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').should('have.text', 'Like Exercise ❤️')
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').click()
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').should('have.text', 'Unlike Exercise 💔')
  })

  it('can unlike post', () => {
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').should('have.text', 'Like Exercise ❤️')
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').click()
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').should('have.text', 'Unlike Exercise 💔')
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').click()
    cy.get('[style="margin: 16px;"] > .r-overflow-1udh08x > .css-cursor-18t94o4 > .css-view-1dbjc4n').should('have.text', 'Like Exercise ❤️')
  })
})