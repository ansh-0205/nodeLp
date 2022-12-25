const  jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const request=require('supertest')
const app=require('../app')
const User=require('../models/user')
const user1={
    roles:'admin',
    name:'test1',
    email:'test1234@gmail.com',
    password:'test123456'
}

beforeEach(async()=>{
    await User.deleteMany({})
    await User(user1).save();
})

test('Should sign up for a user ',async()=>{
    await request(app).post('/user/newuser')
    .send({
        roles:'admin',
        name:'test',
        email:'test123@gmail.com',
        password:'test12345'
    })
})
test('Should Login',async()=>{
    await request(app).post('/user/userLogin')
    .send({
        email:user1.email,
        password:user1.password        
    })
})
test('Should Logout',async()=>{
    await request(app).post('/user/logout')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({

    })
})
test('Should show all users',async()=>{
    await request(app).get('/user/users')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .expect(200)
})


test('Should show user with username',async()=>{
    await request(app).get('/user/userName')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        name:user1.name
    })
    .expect(200)
})
test('Should show users with a particular role',async()=>{
    await request(app).get('/user/userRoles')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        roles:user1.roles
    })
    .expect(200)
})
test('Should Update a user ',async()=>{
    await request(app).patch('/user/63a728f6c27bc89d895bce51')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        email:user1.email
    })
    .expect(200)
})
test('Should delete a user ',async()=>{
    await request(app).delete('/user/63a728f6c27bc89d895bce51')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        name:user1.name,
        roles:user1.roles,
        email:user1.email
    })
    .expect(200)
})


