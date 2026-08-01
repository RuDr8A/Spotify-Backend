const { default: mongoose } = require("mongoose");

const albumSchema = new mongoose({
    title : {
        type : String,
        required : true
    },
    music : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Music'
    }],
    artist : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref = 'User'

    }
}) 

const albumModel = mongoose.model("Album", albumSchema)

module.exports = albumModel ;