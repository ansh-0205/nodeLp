const request=require('supertest')
const app=require('../app')
const jwt=require('jsonwebtoken')
const Product=require('../models/product')
const { response } = require('../app')
const user1={
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
beforeEach(async()=>{
    await Product.deleteMany({})
    await Product(product1).save();
})
test('Should add a new Product',async()=>{
    await request(app).post('/product/newProd')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        productName:'testProd123',
        owner:'63a728f6c27bc89d895bce51',
        category:'test123',
        Quantity:'1',
        description:'test123456',
        price:'5000'

    })
    .expect(200)
})
test('Should show all products ',async()=>{
    await response(app).get('/product/prod')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({})
    .expect(200)
})
test('Should show products with a particular product name ',async()=>{
    await request(app).get('/product/prodName')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        productName:product1.productName,
        owner:product1.owner,
        category:product1.category,
        Quantity:product1.Quantity,
        description:product1.description,
        price:product1.price
    })
    .expect(200)
})
test('Should show with a particular Category ',async()=>{
    await request(app).get('/product/prodCat')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        productName:product1.productName,
        owner:product1.owner,
        category:product1.category,
        Quantity:product1.Quantity,
        description:product1.description,
        price:product1.price
    })
    .expect(200)
})
test('Should Update a product ',async()=>{
    await request(app).patch('/product/63a7efa4275c5f729c1a80c5')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        productName:product1.productName
    })
    .expect(200)
})
test('Should delete a product ',async()=>{
    await request(app).delete('/product/63a7efa4275c5f729c1a80c5')
    .set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY3MTg5OTM4MywiZXhwIjoxNjcxOTg1NzgzfQ.S3olQrwdkBqOo1ZYw7w8yQFirk9pWVh_gquHlHgQPKg')
    .send({
        productName:product1.productName,
        owner:product1.owner,
        category:product1.category,
        Quantity:product1.Quantity,
        description:product1.description,
        price:product1.price
    })
    .expect(200)
})