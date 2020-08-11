const config = require("./config")
const port = config.port
const express = require("express")
const fileUpload = require("express-fileupload")
const rateLimit = require("express-rate-limit")
const fs = require("fs");

const app = express()

app.use(express.static("./uploads"))

app.use( fileUpload(config.uploadOptions) )

const limiter = rateLimit( config.limiterOptions )
app.use(limiter)

const uploadLimiter = rateLimit( config.uploadLimiterOptions )
app.use("/upload", uploadLimiter)

app.post("/upload", (req, res) => {
    if( req.files == null ){ res.status(400).send("no file given") }
    if( req.files.file == null ){ res.status(400).send("file must have key name 'file'") }
    let file = req.files.file
    let extension = file.name.split(".").pop()
    if( (config.uploadWhitelist == null || config.uploadWhitelist.includes(req.ip)) && (config.mimeWhitelist == null || config.mimeWhitelist.includes(req.files.file.mimetype)) ){
        let fileName = `${file.md5}-${Date.now()}.${extension}`
        file.mv(`./uploads/${fileName}`, (err) => {
            if(err){ res.status(500).send("unable to upload file"); return }
            res.status(200).send( fileName )
        } )
    }
    else{
        res.status(415).send("mime type not allowed")
    }
} )

app.delete("/:name", (req, res) => {
    if(config.deleteWhitelist != null && !config.deleteWhitelist.includes(req.ip)){
        res.status(403).send("unauthorized ip"); return
    }
    fs.unlink( `./uploads/${req.params.name}`, (err) => {
        if(err && err.code == "ENOENT") {
            res.status(404).send("file not found")
        } 
        else if (err) {
            res.status(500).send("unable to delete file")
        } 
        else {
            res.status(200).send("file deleted")
        }
    } )
} )

app.use( (req, res) => {
    res.status(404).send("page not found")
} )

app.use( (err, req, res, next) => {
    console.log(err)
    res.status(500).send("unknown server error")
} )

app.listen(port, () => {
    console.log(`file server listening to post ${port}...`)
} )