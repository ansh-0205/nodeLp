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
router.get('/userName',userName);
router.get('/userRoles',userRoles);
router.patch('/:id',authentication.auth,updateUser);
router.delete('/:id',authentication.auth,deleteUser);



module.exports=router;