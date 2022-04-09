describe("bestscore",()=>{
    it("bestscore-page",()=>{
        cy.visit("/")
        cy.get('[data-cy=username-input]').click().type('abcd1234')
        cy.get('[data-cy=login-button]').click()

        cy.get('[data-cy=link-leadboard]').click()
        cy.url().should('include',"/leaderBoard")

        cy.get('[data-cy=title-top5]')
    })
})