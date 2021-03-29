before(() => {
    cy.visit('http://localhost:19006/')
    cy.get('[type="text"]').type('test')
    cy.get('[type="password"]').type('test')
    cy.get('[role="button"]:first').click()
    cy.get('[aria-label="cals, tab, 4 of 5"]').click()
})

describe("exercise list displays", function () {
    it ("access list", function () {
    })

    it ("all exercises listed", function () {
        cy.get('div').contains("Run")
        cy.get('div').contains("Yoga")
        cy.get('div').contains("Home cardio")
        cy.get('div').contains("Tennis")
        cy.get('div').contains("Swimming")
        cy.get('div').contains("Basketball")
        cy.get('div').contains("Jump rope")
        cy.get('div').contains("Hiking")
        cy.get('div').contains("Other")
    })
})

describe("selecting exercise for counter", function () {
    it ("pick exercise from list and access counter", function () {
        cy.contains('Tennis').click()
        cy.contains('Go to counter').click()
        cy.get('div').contains('Exercise: Tennis')
    })
})

describe("calorie counter displays" , function () { 
    it ("timer shown", () => {
        cy.get('div').contains('00:00:00')
    })

    it ("start shown", () => {
        cy.get('[role="button"]').contains('Start')
    })

    it ("pause shown", () => {
        cy.get('[role="button"]').contains('Pause')
    })

    it ("stop shown", () => {
        cy.get('[role="button"]').contains('Stop')
    })

    it ("exercise shown", () => {
        cy.get('div').contains('Exercise:')
    })

    it ("calories shown", () => {
        cy.get('div').contains('Calories burnt so far:')
    })
})

describe("basic timer functionality", function () {
    it ("start works", function () {
        cy.get('div').contains('00:00:00').as("timer")
        cy.get('[role="button"]').contains('Start').click()
        cy.wait(1000)
        cy.get('@timer').contains('00:00:01')
    })

    it ("pause works", function () {
        cy.get('div').contains('00:00:01').as('timer')
        cy.get('[role="button"]').contains('Pause').click()
        cy.get('@timer').contains('00:00:01')
    })

    it ("calorie reset works", function () {
        cy.get('[role="button"]').contains('Reset calories').click()
        cy.get('div').contains('Calories burnt so far: 0.0000')
    })

    it ("stop works", function () {
        cy.get('[role="button"]').contains('Stop').click()
        cy.get('div').contains('00:00:00')
    })
})

describe("pick new exercise" , function () { 
    it ("back to exercise list", () => {
        cy.contains('Back to exercise list').click()
    })
    
    it ("to counter with new exercise", () => {
        cy.contains('Run').click()
        cy.contains('Go to counter').click()
        cy.get('div').contains('Exercise: Run')
    })
})