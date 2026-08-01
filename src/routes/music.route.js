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
router.get('/', authMiddleWare.authUser,  musicController.getAllMusic);
router.get('/albums', authMiddleWare.authUser,  musicController.getAllAlbum);
router.post('/create-playlist', authMiddleWare.authOnlyUser,  musicController.createPlaylist);
router.get('/albums/:albumId', authMiddleWare.authUser,  musicController.getAlbumById);

module.exports = router 