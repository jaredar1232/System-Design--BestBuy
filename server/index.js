const path = require('path');
const express = require('express');
const port = process.env.PORT || 3001;
const AWS = require('aws-sdk');
// const db = require('./db/models.js');
var cors = require('cors')
const db = require('./db/index.js')
//const keys = require('../keys.js');


let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());

app.get('/get_image', (req, res) => {

  //let cloudFront = new AWS.CloudFront.Signer(keys.aws_private_key, keys.aws_public_key);
  cloudFront.getSignedUrl({}, (err, url) => { })

});

// app.get('/get_items', (req, res) => {

//   db.getAllItems().then(data => {
//     res.status(200).send(data);
//   })
//     .catch(err => res.status(400).send(err));

// });

app.post('/search', (req, res) => {
  const text = req.body.text;
  // console.log(text);
  db.searchString(text)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => res.status(400).send(err));
});

// app.post('/search_related', (req, res) => {
//   const text = req.body.text;
//   console.log(text);
//   db.searchRelated(text).then(data => {
//     res.status(200).send(data);
//   })
//     .catch(err => res.status(400).send(err));
// });

app.listen(port, () => {
  console.log(`Server is up and listening on port: ${port}`);
});