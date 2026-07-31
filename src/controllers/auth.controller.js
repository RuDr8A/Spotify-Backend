const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    const {username, email, password, role = 'user'} = req.body ;

    const isUserAlreadyExists = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({message : "user already exists"}) ;
    }

    const newUser = await userModel.create({
        username,
        email,
        password,
        role
    })

    const token = jwt.sign({
        _id : newUser._id,
        role : newUser.role
    }, process.env.JWT_SECRET)

    res.cookie('token', token);
    res.status(201).json({
        message : "user created successfully",
        User : newUser
    })
}

module.exports = registerUser ;