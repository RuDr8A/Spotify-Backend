const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");
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


module.exports = { createMusic, createAlbum };