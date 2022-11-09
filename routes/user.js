const express = require('express');
const router = new express.Router();
const app = express();
const authentication = require('../middleware/auth');
app.use(express.json());
const{
    newuser,
    userLogin,
    users,
    userName,
    userRoles,
    updateUser,
    deleteUser
} = require('../controllers/user');
router.post('/newuser',newuser);
router.get('/userLogin',userLogin);
router.get('/users',authentication.auth,users);
router.get('/userName',[authentication.auth,authentication.admin],userName);
router.get('/userRoles',authentication.auth,authentication.admin,userRoles);
router.patch('/:id',[authentication.auth,authentication.admin],updateUser);
router.delete('/:id',authentication.auth,authentication.admin,deleteUser);



module.exports=router;