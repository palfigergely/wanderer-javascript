const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();


// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.listen(port, 'localhost', () => {
  console.log(`The app is listening on port ${port}...`)
})