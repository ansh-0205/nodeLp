const express = require('express');
const router = new express.Router();
const app = express();
const authentication = require('../middleware/auth');
const {upload, addProfile} = require('../Fileupload/profilePic');
app.use(express.json());
const{
    newuser,
    userLogin,
    users,
    userName,
    userRoles,
    updateUser,
    deleteUser,
    logout
} = require('../controllers/user');


router.post('/profilePic' ,authentication.auth, upload.single('profile') ,addProfile);
router.post('/newuser',newuser);
router.post('/userLogin',userLogin);
router.post('/logout' ,authentication.auth , logout);
router.get('/users',authentication.auth,users);
router.get('/userName',[authentication.auth],userName);
router.get('/userRoles',[authentication.auth],userRoles);
router.patch('/:id',[authentication.auth],updateUser);
router.delete('/:id',[authentication.auth],deleteUser);



module.exports=router;