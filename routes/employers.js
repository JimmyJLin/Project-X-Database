var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var employers    = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/employers.js');
const secret      = process.env.SECRET;
const multer = require('multer');
const upload = multer({ dest: 'public/images/company_logo/'})


employers.route('/')
  .get(db.showAllEmployers, (req, res) => {
    res.send(res.rows);
  })

employers.route('/upload_image')
  .post(upload.any(), db.uploadCompanyImage, (req, res) => {
    res.send(req.files);
  })

employers.route('/new')
  .post(db.postOneEmployer, (req, res) => {
    res.send(res.rows)
  })

employers.route('/:employer_id')
  .post(db.postOneEmployerImage, (req, res) => {
    res.send(res.rows)
  })
  .get( db.showOneEmployer, (req, res) => {
    res.send(res.rows);
  })

module.exports = employers;
