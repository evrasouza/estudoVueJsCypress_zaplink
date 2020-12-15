describe('Cadastro de Contatos', () => {

    const user = { email: 'patricia@gmail.com', password: 'pwd123' }

    before(()=> {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 'Content-Type': 'application/json' },
            body: user,
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
        })

        cy.doLogin(user.email, user.password)
        cy.get('.dashboard', {timeout: 5000}).should('be.visible')
    })

    describe('Novo Contato', () => {
        let contact = {
            name: 'Everton Souza',
            number: '199888877776',
            description: 'Solicitar orçamento para Consultoria em QA.'
        }

        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve cadastrar esse contato', () => {
                cy.contactList().contains(contact.name)
            })
        })

        describe('Quando submeto o cadastro sem o nome', () => {

            let contact = {
                number: '199888877776',
                description: 'Solicitar orçamento para Consultoria em QA.'
            }

            const expectNotice = 'Nome é Obrigatório'

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a notificação ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertName().contains(expectNotice)
            })
        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {

            let contact = {
                name: 'Everton Souza',
                description: 'Solicitar orçamento para Consultoria em QA.'
            }

            const expectNotice = 'Whatsapp é Obrigatório'
    
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a notificação ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertNumber().contains(expectNotice)
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {

            let contact = {
                name: 'Everton Souza',
                number: '199888877776'
            }

            const expectNotice = 'Assunto é Obrigatório'

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Deve exibir a notificação ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertDesc().contains(expectNotice)
            })
        })



    })

})
