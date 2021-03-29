before(() => {
    cy.visit('http://localhost:19006/')
    cy.get('[type="text"]').type('test')
    cy.get('[type="password"]').type('test')
    cy.get('[role="button"]:first').click()
    //cy.request({ method: 'POST', body: { username: 'test', password: 'test' })
    /*cy.intercept('POST', 'http://127.0.0.1:8000/users/login/', (req) => {
        req.body = { username: 'test', password: 'test' }
    })*/
    cy.get('[aria-label="search, tab, 2 of 5"]').click()
})

describe("search page displays", function () {
    it ("access search page", function () {
    })

    it ("initial search menu loaded", function () {
        cy.get('input[placeholder="Search"]')
        cy.get('[role="button"]').contains('Search')
        cy.get('[role="button"]').contains('Show')
        cy.get('div').contains('in: users')
        cy.get('div').contains('0 result(s) for "" in users')
    })
})

describe("dropdown toggles", function () {
    it ("show dropdown", function () {
        cy.get('[role="button"]').contains('Show').click()
    })

    it ("hide dropdown", function () {
        cy.get('[role="button"]').contains('Select').click()
    })
})

describe("user search" , function () {
    it ("perform search", function () {
        cy.get('input[placeholder="Search"]').clear()
        cy.get('input[placeholder="Search"]').type('test')
        cy.get('[role="button"]').contains('Search').click()
    })

    it ("displays results status", function () {
        cy.get('div[class="css-text-901oao"]').contains('1 result(s) for "test" in users')
    })

    it ("displays results", function () {
        cy.get('div').contains('User: test')
    })
})

describe("empty search", function () {
    it ("perform empty search", function () {
        cy.get('input[placeholder="Search"]').clear()
        cy.get('input[placeholder="Search"]').clear()
        cy.get('[role="button"]').contains('Search').click()
    })

    it ("correct result status", function () {
        cy.get('div[class="css-text-901oao"]').contains('0 result(s) for "" in ')
    })
})

describe("select/perform different search type", function () {
    it ("select posts", function () {
        cy.get('[role="button"]').contains('Show').click()
        cy.get('div[class="css-text-901oao"]').contains('posts').click()
        cy.get('[role="button"]').contains('Select').click()
    })

    it ("perform posts search", function () {
        cy.get('input[placeholder="Search"]').clear()
        cy.get('input[placeholder="Search"]').clear()
        cy.get('input[placeholder="Search"]').type('test')
        cy.get('[role="button"]').contains('Search').click()
    })

    it ("select streams", function () {
        cy.get('[role="button"]').contains('Show').click()
        cy.get('div[class="css-text-901oao"]').contains('streams').click()
        cy.get('[role="button"]').contains('Select').click()
    })

    it ("perform streams search", function () {
        cy.get('input[placeholder="Search"]').clear()
        cy.get('input[placeholder="Search"]').clear()
        cy.get('input[placeholder="Search"]').type('test')
        cy.get('[role="button"]').contains('Search').click()
    })
})
