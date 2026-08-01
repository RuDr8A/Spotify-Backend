const { ImageKit } = require("@imagekit/nodejs/client.js");

const imageKitClient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
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