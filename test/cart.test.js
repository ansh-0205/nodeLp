const request=require('supertest')
const app=require('../app')
const Cart=require('../models/cart')
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

beforeEach(async()=>{
    await Cart.deleteMany({})
    await Cart(Cart1).save();
})

test('Should add to the cart ',async()=>{
    await request(app).post('/cart/addtocart/1/63a8467c7a8a174a2749aa54')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MjEzMTIyOSwiZXhwIjoxNjcyMjE3NjI5fQ.3M6fdL41De5hQgA1a1tHidH5IkBeSMYQar9lyNipbR0')
    .send({
        owner:Cart1.owner,
        products:[{
            product:Cart1.products.product,
            quantity:Cart1.products.quantity,
        }]
    })
    .expect(201)
})
test('Should View the cart ',async()=>{
    await request(app).get('/cart/showcart')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MjEzMTIyOSwiZXhwIjoxNjcyMjE3NjI5fQ.3M6fdL41De5hQgA1a1tHidH5IkBeSMYQar9lyNipbR0')
    .send({
        owner:user1._id
    })
    .expect(200)
})
test('Should Delete items from the cart ',async()=>{
    await request(app).post('/cart/deleteitem/63a8467c7a8a174a2749aa54')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MjEzMTIyOSwiZXhwIjoxNjcyMjE3NjI5fQ.3M6fdL41De5hQgA1a1tHidH5IkBeSMYQar9lyNipbR0')
    .send({
        owner:user1._id
    })
    .expect(200)
})