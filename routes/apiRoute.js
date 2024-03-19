//packages/dependencies
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
//port, env for user env.
const PORT = process.env.PORT || 3009;
const dataStorage = path.join(__dirname, 'Develop', 'db', 'db.json');

app.use(function(req, res, next) {
    if (req.url.endsWith('.js')) {
        res.set('Content-Type', 'text/javascript');
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', function(req, res) {
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
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            id: Date.now(), 
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