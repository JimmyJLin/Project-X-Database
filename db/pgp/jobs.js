const pgp  = require( 'pg-promise' )();

if(process.env.ENVIRONMENT === 'production') {
  var cn = process.env.DATABASE_URL
} else {
  var cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
}

const db = pgp(cn);

// show all jobs
function showAllJobs(req,res,next){
  db.any('select * from Jobs;')
  .then(function(data) {
    res.rows= data;
    console.log('this should show all Jobs;', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// post a job
function postAJob(req,res,next){
  db.none(`INSERT INTO Jobs  (employer_id,title,description,location,type,industry,salary,experience_level,education_level,starting_date, status) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11);`,
    [req.body.employer_id, req.body.title, req.body.description, req.body.location, req.body.type,req.body.industry,req.body.salary,req.body.experience_level,req.body.education_level,req.body.starting_date,req.body.status])
  .then(function(data) {
    console.log('success',data);
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// Show all active jobs from applicant
function showAllActiveJobs(req,res,next){
  db.any('select * from Jobs where status = $1;', ['active'])
  .then(function(data) {
    res.rows= data;
    console.log('this should show all Active Jobs;', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// get all active jobs based on employer id
function showActiveJobs(req,res,next){
  db.any('select * from Jobs where employer_id = $1 and status = $2 ;', [req.params.employer_id, 'active'] )
  .then(function(data) {
    res.rows= data;
    console.log('this should show one Job', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// get all archived jobs
function showArchivedJobs(req,res,next){
  db.any('select * from Jobs where employer_id = $1 and status = $2 ;', [req.params.employer_id, 'archived'] )
  .then(function(data) {
    res.rows= data;
    console.log('this should show archived Job', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// get one job detail based on job_id
function getOneJob(req,res,next){
  db.any('select * from Jobs where id = $1;', [req.params.job_id] )
  .then(function(data) {
    res.rows= data;
    console.log('this should get one Job', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// update job status to archived
function updateJobStatusToArchived(req,res,next){
  db.none(`update Jobs set status = $1 where id = $2`,
    ['archived', req.params.job_id])
    .then(() => {
      console.log('Updated Job Status to Archived');
      next()
    })
    .catch((err) => {
      console.error('error updating job status: ', err);
    })
};

// update job status to active
function updateJobStatusToActive(req,res,next){
  db.none(`update Jobs set status = $1 where id = $2`,
    ['active', req.params.job_id])
    .then(() => {
      console.log('Updated Job Status to Active');
      next()
    })
    .catch((err) => {
      console.error('error updating job status: ', err);
    })
};


// apply for one job
function applyOneJob(req, res, next){
  db.any(`INSERT INTO applications  (
    applicant_id,
    job_id,
    status
  ) VALUES ($1, $2, $3);`,
    [
      req.body.applicant_id,
      req.body.job_id,
      req.body.status
    ])
  .then(function(data) {
    res.rows = data[0]
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

// get one applicant info
function getJobApplicants(req, res, next){
 db.any(
 "SELECT * FROM Applications INNER JOIN ApplicantUsers on ApplicantUsers.id = Applications.applicant_id where Applications.job_id = $1;"
 , [req.params.job_id] )
 .then(function(data) {
   res.rows= data
   console.log('successfully getting current applicants for the job', data)
   next();
 })
 .catch(function(error){
   console.error(error);
 })
}


module.exports.showAllJobs = showAllJobs;
module.exports.postAJob = postAJob;
module.exports.showActiveJobs = showActiveJobs;
module.exports.showArchivedJobs = showArchivedJobs;
module.exports.getOneJob = getOneJob;
module.exports.updateJobStatusToArchived = updateJobStatusToArchived;
module.exports.updateJobStatusToActive = updateJobStatusToActive;
module.exports.applyOneJob = applyOneJob;
module.exports.getJobApplicants = getJobApplicants;
