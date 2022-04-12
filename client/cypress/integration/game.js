describe("Game",()=>{
    it("play",()=>{
        cy.visit("/")
        cy.get('[data-cy=username-input]').click().type('abcd1234')
        cy.get('[data-cy=login-button]').click()
        cy.url().should('include', '/game')

        for(let i=0;i<10;i++){
            cy.wait(4*1000)
            cy.get('[data-cy=radio-0]', { timeout: 10000 }).click()
            cy.get('[data-cy=button-next]').click()
        }

        cy.url().should('include', '/score')
    })
})