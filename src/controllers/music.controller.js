const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");
const playListModel = require("../models/playlist.model");
const { uploadFile } = require('../services/storage.service');


async function createMusic(req, res) {
    
    //  Handle the file upload and DB creation in a separate try-catch
    try {
        const { title } = req.body;
        const file = req.file;

        // Ensure the file exists before trying to read its buffer
        if (!file) {
            return res.status(400).json({ message: "Audio file is required" });
        }

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user._id  
        });

        res.status(201).json({
            message: "Music created successfully",
            music: music
        });
        
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "An error occurred while saving the music" });
    }
}

async function createAlbum(req, res) {
    
    try {
        const { title, musicIds } = req.body;

        
        if (!title) {
            return res.status(400).json({ message: "Album title is required" });
        }

        if(musicIds && musicIds.length > 0){
            const songs = await musicModel.find({_id : {$in : musicIds}})

            if(songs.length !== musicIds.length){
                return res.status(400).json({ message: "One or more songs do not exist in the database" });
            }

            const allSongsBelongToArtist = songs.every(
                (song) => song.artist.toString() === req.user._id.toString()
            )

            if (!allSongsBelongToArtist) {
                return res.status(403).json({ message: "Forbidden: You can only add your own songs to an album." });
            }
        }

        const album = await albumModel.create({
            title,
            artist: req.user._id, 
            music: musicIds || [] // Default to an empty array if they don't pass any songs yet
        });

        res.status(201).json({
            message: "Album created successfully",
            album: album
        });

    } catch (error) {
        console.error("Album creation error:", error);
        res.status(500).json({ message: "An error occurred while creating the album" });
    }
}

async function getAllMusic(req, res) {
    try {
        // Find all songs and populate the artist data
        const musics = await musicModel.find().populate('artist', 'username email');
        
        res.status(200).json({
            message: "All Music fetched successfully",
            musics: musics
        });
    } catch (error) {
        console.error("Fetch music error:", error);
        res.status(500).json({ message: "An error occurred while fetching music" });
    }
}

async function getAllAlbum(req, res) {
    try {
        const albums = await albumModel
            .find()
            .populate('artist', 'username email')
            .populate('music', 'uri title, artist'); 
        
        res.status(200).json({
            message: "All Albums fetched successfully",
            albums: albums
        });
    } catch (error) {
        console.error("Fetch album error:", error); 
        res.status(500).json({ message: "An error occurred while fetching albums" }); 
    }
}

async function createPlaylist(req, res) {
    try{
        const {title, musics} = req.body ;
        if (!title) {
            return res.status(400).json({ message: "Playlist title is required" });
        }

        const playlist = await playListModel.create({
            title,
            user : req.user._id,
            musics : musics ||[]
        })
        res.status(201).json({
            message: "Playlist created successfully",
            playlist: playlist
        });
    }catch(error){
        console.error("Playlist creation error:", error);
        res.status(500).json({ message: "An error occurred while creating the playlist" });
    }
}


module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbum, createPlaylist};