const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');

async function createMusic(req, res) {
    // 1. Check for the token first
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }

    let decoded;
    
    // 2. Safely verify the token
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    // 3. Check authorization role
    if (decoded.role !== 'artist') {
        return res.status(403).json({ message: "You don't have access to create music" });
    }

    // 4. Handle the file upload and DB creation in a separate try-catch
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
            artist: decoded._id   // FIXED: Using `decoded._id` instead of the broken `jwt.decoded.id`
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
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }

    let decoded; 

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); 
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded.role !== 'artist') { 
        return res.status(403).json({ message: "You don't have access to create albums" });
    }

    
    try {
        const { title, musicIds } = req.body;

        
        if (!title) {
            return res.status(400).json({ message: "Album title is required" });
        }

        const album = await albumModel.create({
            title,
            artist: decoded._id, 
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