import grid from 'gridfs-stream'
import mongoose from 'mongoose';
///read the original documentry for more information
const url = "http://localhost:5000";

let gfs, gridFsBucket;

// opening the mongoose connection
// if connection is open then the callback fuction will bring data
const connect = mongoose.connection;
connect.once('open', () => {
    // gridfs take two arguement first db name which is connected
    gridFsBucket = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'fs'
    });
    // second is the bucket name ,from which you want to collect data
    gfs = grid(connect.db, mongoose.mongo);
    gfs.collection('fs');
})

export const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(404).json("File not found");

    }
    //Now we have to return the url of the file that is uploaded on the mongodb
    const imageUrl = `${url}/api/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
}
export const uploadaudio = async (req, res) => {
    if (!req.file) {
        return res.status(404).json("audio not found");

    }
    //Now we have to return the url of the file that is uploaded on the mongodb
    const imageUrl = `${url}/api/audiofile/${req.file.filename}`;
    // const audioUrl = `${url}/api/audiofile/${req.file._id}`;
    
    console.log("filename", req.file.filename)
    return res.status(200).json(imageUrl);
    // res.send({ file: req.file });
}

export const getImage = async (req, res) => {
    try {
        // const file = await gfs.audio.findOne({ _id: req.params.filename });
        
        const file = await gfs.files.findOne({ filename: req.params.filename });
        // this data from mongo db will come into stream , we have to convert it first to read it
        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
        // console.log(res)
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getAudio = async (req, res) => {
    try {
        console.log("hitting", req.params.filename)
        const file = await gfs.audio.files.findOne({ filename: req.params.filename });
        if (!file) {
            return res.status(404).json({ error: "file not found" })
        }
        console.log(req.params.filename, "getaudio")
        // this data from mongo db will come into stream , we have to convert it first to read it
        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json(error.message);
    }
}