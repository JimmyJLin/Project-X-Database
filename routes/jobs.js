var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var jobs          = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/jobs.js');
const secret      = "sosecret";



jobs.route('/')
  .get(db.showAllJobs, (req, res) => {
    res.send(res.rows);
  })

jobs.route('/new')
  .post(db.postAJob, (req, res) => {
    res.status( 201 ).json( { data: 'success' } );
  });

jobs.route('/active/:employer_id')
  .get( db.showActiveJobs, (req, res) => {
    res.send(res.rows);
  });

jobs.route('/archived/:employer_id')
  .get( db.showArchivedJobs, (req, res) => {
    res.send(res.rows);
  });

jobs.route('/:job_id')
  .get( db.getOneJob, (req, res) => {
    res.send(res.rows)
  })

jobs.route('/active/update/:job_id')
  .post( db.updateJobStatusToActive, (req, res) => {
    res.send(res.rows)
  })

jobs.route('/archived/update/:job_id')
  .post( db.updateJobStatusToArchived, (req, res) => {
    res.send(res.rows)
  })

  jobs.route('/applications')
    .get( db.showAllApplications, (req, res) => {
      res.send(res.rows)
    })

jobs.route('/application')
  .post( db.applyOneJob, (req, res) => {
    res.send(res.rows)
  })

jobs.route('/application/:job_id')
  .get( db.getJobApplicants, (req, res) => {
    res.send(res.rows)
  })

module.exports = jobs;
