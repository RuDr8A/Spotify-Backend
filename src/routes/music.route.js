const express = require('express')
const musicController = require('../controllers/music.controller');
const multer = require('multer');
const authMiddleWare = require('../middleWares/auth.middleware');

const upload = multer({
    storage : multer.memoryStorage() 
})
const router = express.Router() ;


router.post('/create',authMiddleWare.authArtist, upload.single("music"), musicController.createMusic)
router.post('/create-album', authMiddleWare.authArtist,  musicController.createAlbum)

module.exports = router 