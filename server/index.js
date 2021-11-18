const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//rollbar
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b0e54b6d8b3e4498b6f26f73063621d1',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Lejonnnn')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"))
    rollbar.info("HTML file served successfully");
})

app.use("/", express.static(path.join(__dirname, "../index.html")))


app.use("/css", express.static(path.join(__dirname, "../styles.css")))

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4005

app.listen(port, () => {
    console.log(`unlimited powerrrrrrrr on ${port}`)
})