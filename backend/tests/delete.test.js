const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('DELETE /contacts', () => {


    let userToken;

    before(async ()=> {
        const user = { email: 'rafael@gmail.com', password: 'pwd123' }

        var server = await init();

        await server.inject({
            method: 'post',
            url: '/user',
            payload: user
        })

        resp = await server.inject({
            method: 'post',
            url: '/session',
            payload: user
        })

        //console.log(resp.result)

        userToken = resp.result.user_token
    })


    describe('dado que eu tenho um contato indesejado', ()=> {

        const contact = {
            name: 'Adrian Smith',
            number: '11999997777',
            description: 'Guitarrista Iron Maiden'
        }

        let server;
        let resp;
        let contactId;

        before(async ()=> {
            server = await init()

            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            })

            contactId = resp.result._id
        })

        it('quando eu apago esse contato', async () => {
            resp = await server.inject({
                method: 'delete',
                url: '/contacts/' + contactId,
                headers: { 'Authorization': userToken }
            })
        })

        it('deve retornar 204', () => {
            expect(resp.statusCode).to.equal(204)
        })

        it('quando tento apagar um contato inexistente', async () => {
            resp = await server.inject({
                method: 'delete',
                url: '/contacts/' + contactId,
                headers: { 'Authorization': userToken }
            })
        })

        it('deve retornar 404', () => {
            expect(resp.statusCode).to.equal(404)
        })

    })

})
