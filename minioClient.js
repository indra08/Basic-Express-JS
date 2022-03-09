const Minio = require('minio');

const endPoint = 'minio.gmedia.bz';
const bucket = 'gmedia-bucket';

const minioClient = new Minio.Client({
    endPoint: endPoint,
    port: 8000,
    useSSL: false,
    accessKey: 'gmediaapp',
    secretKey: 'Janglidalam29J'
});

module.exports = {
    minioClient,
    endPoint,
    bucket
};