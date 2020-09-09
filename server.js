const express = require('express');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
const app = express();

app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/src'));

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.listen(port, host, () => {
  console.log(`The app is listening on port ${port}...`)
})