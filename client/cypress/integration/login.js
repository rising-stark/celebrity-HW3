describe("Login Page",() => {
    it("loads and redirects",()=>{
        cy.visit("/")
        cy.url().should('include','/login')
    });
    it("login success",()=>{
        cy.visit("/")
        cy.get('[data-cy=username-input]').click().type('abcd1234')
        cy.get('[data-cy=login-button]').click()
        cy.url().should('include', '/game')


    });
    it("login failure-non alpha",()=>{
        cy.visit("/")
        cy.get('[data-cy=username-input]').click().type('abcd1234$')
        cy.get('[data-cy=login-button]').click()
        cy.url().should('not.include', '/game')
        cy.url().should('include', '/login')

        cy.get('*[class^="ant-message-custom-content ant-message-error"]')
        cy.get('*[class^="ant-message-notice-content"]')
        cy.get('*[class^="ant-message-notice"]')
    });
    it("login failure-empty",()=>{
        cy.visit("/")
        cy.get('[data-cy=login-button]').click()
        cy.url().should('not.include', '/game')
        cy.url().should('include', '/login')

        cy.get('*[class^="ant-message-custom-content ant-message-error"]')
        cy.get('*[class^="ant-message-notice-content"]')
        cy.get('*[class^="ant-message-notice"]')
    });
})