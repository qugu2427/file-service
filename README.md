# FileServer
an express file server

To upload a file: <br>
POST /upload <br>
include a form-data encoded field called 'file' containing the file <br>
the file name will be changed on upload <br>
the file will be stored in the upload folder as md5offile-timestamp.extension <br>
if successfull the name of the file will be the response <br>

To view a file: <br>
GET /:name <br>

To delete a file: <br>
DELETE /:name <br>

options for the server can be changed within config.js
