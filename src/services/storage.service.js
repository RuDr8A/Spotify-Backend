const { ImageKit } = require("@imagekit/nodejs/client.js");

const imageKitClient = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file) {
    const result = await imageKitClient.files.upload({
        file,
        fileName : "music_" + Date.now(),
        folder : "COMPLETE-BACKEND/music"
    })
    return result;
}

module.exports = {uploadFile}