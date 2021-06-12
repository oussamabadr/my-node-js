const supertest = require('supertest');
const app = require('./app')
const appHttp = app.app
const initDb = app.initDb

const rootUrl = '/sports'

describe("GET sports", () => {
    test('should get all sports api', () => {
        return supertest(appHttp).get(rootUrl)
        .expect(200)
        .then(response => {
            expect(response.body.length).toEqual(5);
        })
    })

    test('should get sports api by id', () => {
        return supertest(appHttp).get(`${rootUrl}/1`)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual({id: 1, name: 'Tennis'});
        })
    })

    test('should get 404 if sports not found id', () => {
        return supertest(appHttp).get(`${rootUrl}/10`)
        .expect(404)
        .then( response => expect(response.body).toBeNull())
    })
})

describe("POST sports", () => {
    beforeEach(() => {
        return initDb();
    });

    test('should add new sports', () => {
        const newSport = {name: 'Baseball'}
        return supertest(appHttp).post(rootUrl).send(newSport)
        .expect(200)
        .then( response => expect(response.body).toEqual({id: 6, name: 'Baseball'} ))
    })

    test('should successfully get new sport', async () => {
        const newSportName = 'Baseball'
        const newSport = {name: newSportName}

        const response = await supertest(appHttp).post(rootUrl).send(newSport)
        const newSportId = response.body.id

        return supertest(appHttp).get(`${rootUrl}/${newSportId}`)
        .then(response => {
            expect(response.body).toEqual({id: newSportId, name: newSportName});
        })
    })

    test('should return BadRequest if sport already exists', () => {
        const newSport = {name: 'Tennis'}
        return supertest(appHttp).post(rootUrl).send(newSport)
        .expect(400)
        .then( response => expect(response.text).toEqual(`Sport [${newSport.name}] already exist.`) )
    })

    test('should return BadRequest if sport name is null/empty', () => {
        const newSport = {name: null}
        return supertest(appHttp).post(rootUrl).send(newSport)
        .expect(400)
        .then( response => expect(response.text).toEqual('Sport name should not be null or empty.') )
    })
})