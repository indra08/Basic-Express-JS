const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const masterRoutes = require('./routes/master_routes');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({"hallow":"world"});
});

// Memanggil api master
app.use('/master', masterRoutes);

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
