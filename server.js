const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid'); 

const PORT = process.env.PORT || 3000;
const dataStorage = path.join(__dirname, 'Develop', 'db', 'db.json');

// Serve static files
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

// Define routes
app.get('/', function(req, res) {
    // Serve index.html
    res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));
});

app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, 'Develop', 'public', 'notes.html'));
});

app.get('/api/notes', function(req, res) {
    // Read notes from db.json and send as JSON response
    fs.readFile(dataStorage, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading notes');
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', function(req, res) {
    // Handle post request to add a new note
    const title = req.body.title;
    const text = req.body.text;
    
    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            id: uniqid(), // Use uniqid to generate a unique ID
        };

        fs.readFile(dataStorage, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading notes');
            }
            
            let notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile(dataStorage, JSON.stringify(notes, null, 2), function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing note');
                }

                const response = {
                    status: 'success',
                    body: newNote,
                };

                res.json(response);
            });
        });
    } else {
        res.status(400).json({ error: 'Title and text are required' });
    }
});

app.listen(PORT, function () {
    console.log(`Example app listening at http://localhost:${PORT}`);
});