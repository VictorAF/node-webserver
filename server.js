const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Configured to run in HEROKU or LOCAL
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
//Handlebars provides the power necessary to let you build semantic templates effectively with no frustration.
app.set('view engine', 'hbs');


// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
//
// Middleware functions can perform the following tasks:
//
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.
// If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
//
// An Express application can use the following types of middleware:
//
// Application-level middleware
// Router-level middleware
// Error-handling middleware
// Built-in middleware
// Third-party middleware
// You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.



// Create a middleware to help us check how our server is working
app.use((req, res, next) => {
  var now = new Date().toString();
  log = `${now}: ${req.method} ${req.url}`;

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, resp, next) => {
//   resp.render('maintance.hbs');
// });

// YOU CAN USE MIDDLEWARE TO CHECK if your api has been authenticated

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name:'Andrew',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'EAE MEN KRAI'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// For example, Heroku has enviromental variables like the port
app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
