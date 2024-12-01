const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Mad Lib route
server.post('/ITC505/lab-7', (req, res) => {
    const { noun, adjective, verb, pluralNoun, adverb } = req.body;

    // Generate the Mad Lib
    const madLib = `Once upon a time, there was a ${adjective} ${noun} who loved to ${verb} ${adverb}. One day, they found a group of ${pluralNoun} and had an amazing adventure!`;

    // Send the response
    res.send(`<h1>Your Mad Lib Story</h1><p>${madLib}</p>`);
});

// Port setup
let port = 80;
if (process.argv[2] === 'local' || process.env.PORT) {
    port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
