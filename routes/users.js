var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var users         = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/users.js');
const secret      = process.env.SECRET;


// applicant auth
users.route('/applicants')
  .get( db.showAllApplicantUsers, (req, res) => {
    res.send(res.rows);
  })

users.route('/applicants/login')
  .post(db.loginApplicantUser, ( req, res ) => {
    var token = jwt.sign( res.rows, secret );
    res.json( { agent: res.rows, token: token } );
  })

users.route('/applicants/signup')
  .post( db.createApplicantUser, ( req, res ) => {
    console.log('request us receieved', req )
    res.status( 201 ).json( { data: 'success' } );
  });


// employer auth
users.route('/employers')
  .get( db.showAllEmployerUsers, (req, res) => {
    res.send(res.rows);
  })

users.route('/employers/login')
  .post(db.loginEmployerUser, ( req, res ) => {
    var token = jwt.sign( res.rows, secret );
    res.json( { agent: res.rows, token: token } );
  })

users.route('/employers/signup')
  .post( db.createEmployerUser, ( req, res ) => {
    console.log('request us received', req )
    res.status( 201 ).json( { data: 'success' } );
  });






module.exports = users;
