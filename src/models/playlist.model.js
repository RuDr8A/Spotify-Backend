const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    musics : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Music'
    }],
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})
const playListModel = mongoose.model('Playlist', playlistSchema)

module.exports = playListModel