const jwt = require('jsonwebtoken')

async function authArtist(req, res, next) {
    const token = req.cookies.token ;
    if(!token){
        return res.status(401).json({message : "Unauthorized User"})
    }
    let decoded ;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET) ;
    }catch(error){
         return res.status(401).json({message : "Invalid or expired token"})
    }

    if (decoded.role !== 'artist') { 
        return res.status(403).json({ message: "You don't have access to create albums" });
    }
    req.user = decoded;
    next();
    
}

async function authUser(req, res, next) {
    const token = req.cookies.token ;
    if(!token){
        return res.status(401).json({message : "Unauthorized User"})
    }
    let decoded ;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET) ;
    }catch(error){
         return res.status(401).json({message : "Invalid or expired token"})
    }

    if (decoded.role !== 'user' && decoded.role !== 'artist') { 
        return res.status(403).json({ message: "You don't have access to get music" });
    }
    req.user = decoded;
    next();
}

async function authOnlyUser(req, res, next) {
    const token = req.cookies.token ;
    if(!token){
        return res.status(401).json({message : "Unauthorized User"})
    }
    let decoded ;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET) ;
    }catch(error){
         return res.status(401).json({message : "Invalid or expired token"})
    }

    if (decoded.role !== 'user') { 
        return res.status(403).json({ message: "You don't have access to create playlist" });
    }
    req.user = decoded;
    next();
}


module.exports = {authArtist, authUser, authOnlyUser} ;