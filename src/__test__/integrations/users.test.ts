import app from '../../app'
import request from 'supertest'
import jwt from 'jsonwebtoken'
require('dotenv').config()

function generateToken(params = {}){
    return jwt.sign(params, process.env.SECRET, { expiresIn: 1000*3600 }) //expira em 1h
}
var saveSession: string

describe('test user interactions', () => {
    it('should create a new user', (done) => {
        request(app).post('/signup')
        .send({
            "name": "test",
            "user": "test",
            "email": "test@test.com",
            "password": "test123",
            "observation": "test account"
        })
        .expect(200)
        .then(res =>{
            if (res.body.message === "account successfully registered, access your email to activate your account"){
                return done()
            } 
        })
        .catch(err => done(err))
    })
    it('should get an error message when trying to create the same user', (done) => {
        request(app).post('/signup')
        .send({
            "name": "test",
            "user": "test",
            "email": "test@test.com",
            "password": "test123",
            "observation": "test account"
        })
        .expect(200)
        .then(res => {
            if (res.body.message === 'Nome de usuário já cadastrado') {
                return done()
            }
        })
        .catch(err => done(err))
    })
    it('should active the test user', (done) => {
        const user = 'test'
        const token = generateToken({ user })
        request(app).get(`/active?token=${token}&user=${user}`)
        .send({
            token, user
        })
        .then(res => {
            if (res.body.user.name === 'test') return done()
        })
        .catch(err => done(err))
    })
    it('should login with test user', (done) => {
        request(app).post('/signin')
        .send({
            user: 'test',
            password: 'test123'
        })
        .expect(200)
        .then(res =>{
            if (res.body.user.name === 'test') return done()
        })
        .catch(err => done(err))
    })
    it('should renew test user', (done) => {
        request(app).put('/renew')
        .send({
            secret: process.env.SECRET,
            user: 'test',
            days: 30
        })
        .expect(200)
        .then(res => {
            if (new Date(res.body.user.expires).getTime() >= (new Date().getTime() + 3600*24*29)) return done()
            else return done("err")
        })
        .catch(err => done(err))
    })
    it('should change password of test user', (done) => {
        request(app).post('/change-password')
        .send({
            user: 'test',
            password: 'test123',
            newPassword: 'test1234'
        })
        .expect(200)
        .then(res => {
            if (res.body.message === 'password changed successfully') return done()
            else return done("err")
        })
        .catch(err => done(err))
    })
    it('should login with new password of test user', (done) => {
        request(app).post('/signin')
        .send({
            user: 'test',
            password: 'test1234'
        })
        .expect(200)
        .then(res =>{
            saveSession = res.body.token
            if (res.body.user.name === 'test') return done()
        })
        .catch(err => done(err))
    })
    it('should change observation of test user', (done) => {
        request(app).put('/update-user')
        .send({
            user: 'test',
            token: saveSession,
            observation: 'new observation'
        })
        .expect(200)
        .then(res =>{
            if (res.body.user.observation === 'new observation') return done()

            else return done('error')
        })
        .catch(err => done(err))
    })
    it('should refresh token of test user', (done) => {
        request(app).post('/refresh-token')
        .send({
            token: saveSession
        })
        .expect(200)
        .then(res =>{
            saveSession = res.body.token
            if (typeof res.body.token === 'string') return done()

            else return done('error')
        })
        .catch(err => done(err))
    })
    it('should desactive test user', (done) => {
        request(app).patch('/desactive-user')
        .send({
            user: 'test',
            token: saveSession
        })
        .expect(200)
        .then(res =>{
            if (!res.body.user.active) return done()

            else return done('error')
        })
        .catch(err => done(err))
    })
    it('should delete test user', (done) => {
        request(app).delete('/delete-user')
        .send({
            user: 'test',
            token: saveSession
        })
        .expect(200)
        .then(res =>{
            if (res.body.message === 'user deleted successfully') return done()

            else return done('error')
        })
        .catch(err => done(err))
    })
})