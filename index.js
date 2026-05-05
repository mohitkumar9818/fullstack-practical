const express = require('express');
const app = express;
app.get('/', async (req, res) => {  
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.render('movies/index', { movies });
        res.status(500).render('error',);   
});
app.get('/new', (req, res) => {
    res.render('movies/new', { movie: new Movie() });
});

app.post('/', async (req, res) => {
    const movie = new Movie(req.body); 
        await movie.save();
        res.redirect(`/movies/${movie._id}`);
        res.status(400).render('movies/new');

});
app.get('/:id', async (req, res) => { 
        const movie = await Movie.findById(req.params.id);    
        res.render('movies/show', { movie });        
    
});
app.get('/:id/edit', async (req, res) => {
        const movie = await Movie.findById(req.params.id);
        res.render('movies/edit', { movie });
        res.status(500).render('error',);
});
app.put('/:id', async (req, res) => {
        const movie = await Movie.findById(req.params.id);
        delete req.body.title;
    
        await movie.save();
        res.redirect(`/movies/${movie._id}`);
});
app.delete('/:id', async (req, res) => {
        const movie = await Movie.findByIdAndDelete(req.params.id);     
        res.redirect('/movies');
    
});
app.listen(3000);
