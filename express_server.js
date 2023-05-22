const express = require('express');
const app = express();

const movies = require('./moviesdb.json');
const users = require('./users.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.send('API Movies db');
});

app.get('/api/allmovies', function (req, res) {
    res.json({ movies });
});

app.post('/api', function (req, res) {
    res.json({ text_sent: req.body.text });
});

app.get('/api/movies/:id', function (req, res) {
    const movieId = Number(req.params.id);
    const movie = movies.find(movie => movie.id === movieId);

    if (movie) {
        res.json({ movie });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

app.get('/api/users', function (req, res) {
    res.json({ users });
});

app.post('/api/add', function (req, res) {
    const newUser = req.body.user;
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
});

app.listen(3000, function () {
    console.log('App running on port 3000.');
});
