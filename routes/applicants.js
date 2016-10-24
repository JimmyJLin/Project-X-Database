var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var applicants    = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/applicants.js');
const secret      = process.env.SECRET;



applicants.route('/')
  .get(db.showAllApplicants, (req, res) => {
    res.send(res.rows);
  })




module.exports = applicants;
