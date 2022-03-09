const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const masterRoutes = require('./routes/master_routes');
const path = require('path');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  //res.json({"hallow":"world"});
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Memanggil api master
app.use('/master', masterRoutes);

// Memanggil fungsi upload
const fileUpload = require('express-fileupload');
const minioClient = require('./minioClient');
app.use(fileUpload({
  createParentPath: true
}));

app.post('/upload', function(req, res) {
  
    const files = req.files;
    var fileName = new Date().getTime() +"."+ files.image.name.split('.').pop();;
    minioClient.minioClient.putObject(minioClient.bucket, fileName, files.image.data, function(error, etag) {

        if(error) {
            res.send({
                status: 404,
                message: 'No file uploaded'
            });
        }else{

          const fileUploaded = `https://${minioClient.endPoint}/${minioClient.bucket}/${fileName}`;
          res.send({
              response:{
                  url : fileUploaded
              },
              metadata:{
                status: 200,
                message: 'File uploaded successfully'
              }
          });
        }
    });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});

  return;
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
