const  jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const request=require('supertest')
const app=require('../app')
const cart = require('../models/cart')
const Order=require('../models/order')
const product = require('../models/product')
const Product = require('../models/product')
const User=require('../models/user')
const user1={
    _id:'63a728f6c27bc89d895bce51',
    roles:'admin',
    name:'test1',
    email:'test1234@gmail.com',
    password:'test123456'
}
const product1={
    _id:'63a8467c7a8a174a2749aa54',
    productName:'testProd',
    owner:'63a728f6c27bc89d895bce51',
    category:'test',
    Quantity:'2',
    description:'test123',
    price:'50000'
}
const Cart1={
    owner:'63a728f6c27bc89d895bce51',
    products:[{
        product:'63a8467c7a8a174a2749aa54',
        quantity:1,
    }]
}
const order1={
    user:user1,
    totalPrice:5000,
    product:'63a8467c7a8a174a2749aa54',
    cart:'63a84d1e5d2279020b56688b',
}

beforeEach(async()=>{
    await Order.deleteMany({})
    await Order(order1).save();
})


test('Should place a direct order ',async()=>{
    await request(app).post('/order/directOrder/63a8467c7a8a174a2749aa54/1')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        owner:order1.user
    })
    .expect(200)
})
test('Should place order from the cart ',async()=>{
    await request(app).post('/order/cartOrder')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        user:order1.user,
        cart:Cart1._id,
        totalPrice:order1.totalPrice
    })
    .expect(200)
})
test('Show orders',async()=>{
    await request(app).get('/order/myOrders')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        user:order1.user,
        cart:Cart1._id
    })
    .expect(200)
})