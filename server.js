require( 'dotenv' ).config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')({});
const cors = require('cors');
const app = express();
app.use(cors());


/* app setting */
const port = process.env.PORT || 8080;
const server = app.listen(port);
const request = require('request');


// express server settings
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'ejs');

// routes
const userRoutes = require(path.join(__dirname, '/routes/users'));
const ApplicantsRoutes = require(path.join(__dirname, '/routes/applicants'));
const EmployersRoutes = require(path.join(__dirname, '/routes/employers'));
const JobsRoutes = require(path.join(__dirname, '/routes/jobs'));

// api routes
app.use('/api/users', userRoutes);
app.use('/api/applicants', ApplicantsRoutes);
app.use('/api/employers', EmployersRoutes);
app.use('/api/jobs', JobsRoutes);

app.get('/', function(req, res){
  res.render('pages/index')
})
