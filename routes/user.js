const express = require('express');
const router = new express.Router();
const app = express();
app.use(express.json());
const{
    newuser,
    users,
    userName,
    userRoles,
    updateUser,
    deleteUser
} = require('../controllers/user');
router.post('/newuser',newuser);
router.get('/users',users);
router.get('/userName',userName);
router.get('/userRoles',userRoles);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

app.use(router);
app.listen(3000);
module.exports=router;