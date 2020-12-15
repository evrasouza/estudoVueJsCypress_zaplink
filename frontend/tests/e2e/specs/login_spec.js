
describe('Login', () => {

    const user = { email: 'rafael@gmail.com', password: 'pwd123'}

    before(()=> {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 'Content-Type': 'application/json'},
            body: user,
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    context('Quando submeto credenciais validas', () => {
        before(()=> {
            cy.doLogin(user.email, user.password)
        })

        it('deve exibir o dashboard', () => {
            cy.contains('h4', 'Seu gerenciador digital de contatos').should('be.visible')
        })
    })

    context("Quando submeto uma seha incorreta", () => {
        before(()=> {
            cy.doLogin(user.email, 'abc123')
        })

        it('deve exibir o dashboard', () => {
            cy.loginAlert('Email e/ou senha incorretos!').should('be.visible')
        })
    })

    context("Quando não informo o email", () => {
        before(()=> {
            cy.doLogin('', user.password)
        })

        it('deve exibir o dashboard', () => {
            cy.loginAlert('Oops. Por favor informe o seu email').should('be.visible')
        })
        
    })

    context("Quando não informo a senha", () => {
        before(()=> {
            cy.doLogin(user.email, '')
        })

        it('deve exibir o dashboard', () => {
            cy.loginAlert('Oops. Por favor informe sua senha').should('be.visible')
        })
        
    })

})