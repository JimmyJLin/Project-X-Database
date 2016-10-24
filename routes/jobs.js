var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var jobs          = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/jobs.js');
const secret      = process.env.SECRET;



jobs.route('/')
  .get(db.showAllJobs, (req, res) => {
    res.send(res.rows);
  })




module.exports = jobs;
