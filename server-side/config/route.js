const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({  
    destination: (req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})

const imageFile = multer({storage})

const userController = require('../app/controller/userController')
const adminController = require('../app/controller/adminController')
const userAuthentication = require('../app/middleware/userAuthentication')
const adminAuthentication = require('../app/middleware/adminAuthentication')

router.post('/api/user/register',imageFile.single('file'),userController.create)
router.post('/api/user/login',userController.login)
router.get('/api/user/details',userAuthentication,userController.show)

router.post('/api/admin/login',adminController.login)
router.get('/api/admin/show',adminAuthentication,adminController.show)
router.delete('/api/admin/user/:id',adminAuthentication,adminController.delete)
router.put('/api/admin/update/:id',adminAuthentication,adminController.update)
module.exports = router