const musicModel = require("../models/music.model");
const jwt = require('jsonwebtoken')
async function createMusic(req, res) {
    const token = req.cookies.token ;
    if(!token){
        return res.status(401).json({message : "Unauthorized User"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET )

        if(decoded.role !== 'artist'){
            return res.status(403).json({message : "You don't have to access to create music"})
        }
    }catch(error){
        return res.status(401).json({message : "Unauthorized User"})
    }

    const {title} = req.body ;
    

}