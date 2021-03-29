describe('Succesful Login', () => {
  it('Enters successful username and password', () => {
    cy.viewport('iphone-7')
	  cy.visit('http://localhost:19006/')
    cy.get('input[name="username"')
          .type('ayushigupta')
          .should('have.value', 'ayushigupta')
    cy.get('input[name="password"')
          .type('AYUSHI')
          .should('have.value', 'AYUSHI')
    cy.get('button[name="enter"')
          .click()
    cy.url().should('include', '/home')
  })
})

describe('Unsuccessful Login', () => {
  it('Enters unsuccessful username and password', () => {
    cy.viewport('iphone-7')
	  cy.visit('http://localhost:19006/')
    cy.get('input[name="username"')
          .type('blah')
          .should('have.value', 'blah')
    cy.get('input[name="password"')
          .type('blah')
          .should('have.value', 'blah')
    cy.get('button[name="enter"')
          .click()
    cy.url().should('include', '/login')
  })
})
