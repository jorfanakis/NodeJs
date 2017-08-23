const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Creates a new app
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => { if (err) { console.log('Can\'t write file');}});
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

// Handlebar Helper
hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear();
});

hbs.registerHelper('scream', (msg) => {
  return msg.toUpperCase();
});

// HTTP route handling
// app.get registers a handler for a http request.
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Homepage',
      message: 'Welome to my homepage'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About my page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  });
});

// Bind the application to a port to listen.
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
