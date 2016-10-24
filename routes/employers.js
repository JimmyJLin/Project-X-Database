var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var employers    = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/employers.js');
const secret      = process.env.SECRET;



employers.route('/')
  .get(db.showAllEmployers, (req, res) => {
    res.send(res.rows);
  })




module.exports = employers;
