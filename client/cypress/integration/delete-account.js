import {currentPlayerLS} from "../../src/constants";

describe("delete account",()=>{
    it("delete",()=>{
        cy.visit("/")

        assert.equal(localStorage.getItem(currentPlayerLS), null)

        const username = 'abcd1234'
        cy.get('[data-cy=username-input]').click().type(username)
        cy.get('[data-cy=login-button]').click()

        cy.then(()=>assert.equal(localStorage.getItem(currentPlayerLS), username))

        cy.get('[data-cy=button-delete]').click()

        cy.get('.ant-btn-primary').contains('Yes').click()

        cy.wait(4*1000)
        cy.url().should('include', '/login')
    })
})