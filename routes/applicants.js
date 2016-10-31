var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var applicants    = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/applicants.js');
const secret      = "sosecret";
const multer = require('multer');
const upload = multer({ dest: 'public/images/applicant_profile_img/'})



applicants.route('/')
  .get(db.showAllApplicants, (req, res) => {
    res.send(res.rows);
  })

applicants.route('/upload_image')
  .post(upload.any(), db.uploadProfileImage, (req, res) => {
    res.send(req.files);
  })

applicants.route('/new')
  .post(db.postOneApplicantDetails, (req, res) => {
    res.send(res.rows)
  })

applicants.route('/newTest')
  .post(db.postOneApplicantDetails, (req, res) => {
    res.send(res.rows)
  })

applicants.route('/:applicant_id')
  .get( db.showOneApplicant, (req, res) => {
    res.send(res.rows);
  })
  .post(db.postOneApplicantImage, (req, res) => {
    console.log('this is the req.body', req.body)
    res.send(res.rows)
  })

applicants.route('/profile/:uid')
  .get( db.applicantProfile, (req, res) => {
    res.send(res.rows);
  })


module.exports = applicants;
