describe('Cadastro de Contatos', () => {

    const user = { email: 'patricia@gmail.com', password: 'pwd123'}

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

    describe('Novo Contato', () => {
        let contact = {
            name: 'Everton Rafael de Souza',
            number: '199999999999',
            description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
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
                number: '199999999999',
                description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
            }

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve deve mostrar uma notificação', () => {
                cy.alertName().contains('Nome é Obrigatório')
            })
        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {
            let contact = {
                name: 'Everton Rafael de Souza',
                description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
            }
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve deve mostrar uma notificação', () => {
                cy.alertNumber().contains('Whatsapp é Obrigatório')
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {
            let contact = {
                name: 'Everton Rafael de Souza',
                number: '199999999999'
            }
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve deve mostrar uma notificação', () => {
                cy.alertDesc().contains('Assunto é Obrigatório')
            })
        })
    })
})
