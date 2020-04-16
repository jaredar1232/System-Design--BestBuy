const path = require('path');
const express = require('express');
const port = process.env.PORT || 3001;
const AWS = require('aws-sdk');
// const db = require('./db/models.js'); // legacy mongoose
//const keys = require('../keys.js');
var cors = require('cors')

// pick a DB (also need to change paths down below!)
// const db = require('../MongoDB/db/index.js')
const db = require('./../PostgreSQL/db/models.js')

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());




////////////////////////////////////////////////////////
// POSTGRES
////////////////////////////////////////////////////////

app.post('/search', (req, res) => {
  const name = req.body.text;
  // console.log('should log what i typed', name)
  db.searchString(name)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => res.status(400).send(err));
});

app.post('/id', (req, res) => {
  const id = req.body.id;
  // console.log(id)
  db.searchId(id)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => res.status(400).send(err));
});

app.post('/search_related', (req, res) => {
  const name = req.body.text;
  // console.log('should log what is typed', name)
  db.searchRelated(name)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => res.status(400).send(err));
});

app.get('/get_items', (req, res) => {
  db.getAllItems()
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => res.status(400).send(err));
});


////////////////////////////////////////////////////////
// MONGO
////////////////////////////////////////////////////////

// app.post('/search', (req, res) => {
//   const text = req.body.text;
//   // console.log(text);
//   db.searchString(text)
//     .then(data => {
//       res.status(200).send(data);
//     })
//     .catch(err => res.status(400).send(err));
// });









// app.get('/get_image', (req, res) => {
//   //let cloudFront = new AWS.CloudFront.Signer(keys.aws_private_key, keys.aws_public_key);
//   cloudFront.getSignedUrl({}, (err, url) => { })
// });

// app.get('/get_items', (req, res) => {

//   db.getAllItems().then(data => {
//     res.status(200).send(data);
//   })
//     .catch(err => res.status(400).send(err));

// });


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