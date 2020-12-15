
describe('Remover Contato', () => {

    const user = { email: 'joao@gmail.com', password: 'pwd123'}

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

        cy.doLogin(user.email, user.password)
        cy.get('.dashboard', { timeout: 5000}).should('be.visible')
    })

    const contact = {
        name: 'Paulo Gilberto',
        number: '21159357486',
        description: 'Aulas de Guita',
    }

    context(`Dado que ${contact.name} é um contato indesejado`, () => {

        before(() => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/contacts',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': localStorage.getItem('user_token')},
                body: contact,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Quando eu apago esse contato', () => {
            cy.dash()
            cy.removeContact(contact.number)
        })

        
        it('Não deve exibir no dashboard', () => {
            cy.getContact(contact.number).should('not.visible')
        })

    })

})