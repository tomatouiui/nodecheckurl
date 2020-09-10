const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://apple_1234:Apple_4321@toot.lqori.mongodb.net/tomaDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// app.use((req, res, next) => {
// console.log('new request');
// console.log('hostname:',req.hostname)
// console.log('path:',req.path)
// console.log('method:',req.method)
// next();
// });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });

// blog routes
app.use('/', blogRoutes);

app.use((req, res) => {
    //res.sendFile('./views/404.html', { root: __dirname});
    res.render('404', { title: '404' });
});