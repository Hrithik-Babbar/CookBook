const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.get('/', async (req, res) => {
    res.render('home', { passing: null });
});
app.post('/', async (req, res) => {
    const d = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${req.body.query}&apiKey=b930fd437646485cb7d1bdcc0e9363b3`);
    res.render('home', { passing: d.data.results });
})

app.get('/des/:title/:id', async (req, res) => {
    const d = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/analyzedInstructions?apiKey=b930fd437646485cb7d1bdcc0e9363b3`);
    const steps = d.data[0].steps;
    const title = req.params.title;
    const arr = { title, steps };
    res.render('des', { passing: arr });
});
app.listen(3000, () => {
    console.log("listen on port 3000");
})