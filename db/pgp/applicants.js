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

// show all applicants
function showAllApplicants(req,res,next){
  db.any('select * from Applicants;')
  .then(function(data) {
    res.rows= data;
    console.log('this should show all Applicants;', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};


// upload profile image
function uploadProfileImage(req,res,next){
  req.body.filename = req.files[0].filename;
  console.log(req.body)
  req.body.filename = req.files[0].filename;
  db.none(`update Applicants set
    profile_image = $/filename/
    where id = $/id/`,
      req.body)
    .then(() => {
      console.log('inserted event picture');
    })
    .catch((err) => {
      console.error('error inserting event pic: ', err);
    })
};

// post applicant profile
function postOneApplicantDetails(req,res,next){
  console.log("req.body coming from db_apex file postOneApplicant", req.body)
  db.any(`UPDATE Applicants SET
    user_id = $1,
    desired_industry =$2,
    education_level =$3,
    school = $4,
    experience_level = $5,
    resume_pdf = $6,
    profile_image = $7,
    desired_location =$8,
    certifications = $9,
    languages_spoken = $10 where user_id = $1 returning id;`,
    [
      req.body.user_id,
      req.body.desired_industry,
      req.body.education_level,
      req.body.school,
      req.body.experience_level,
      req.body.resume_pdf,
      req.body.profile_image,
      req.body.desired_location,
      req.body.certifications,
      req.body.languages_spoken
    ])
  .then(function(data) {
    res.rows = data[0]
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// show one applicant by id
function showOneApplicant(req,res,next){
  db.any('select * from Applicants where id = $1;', [req.params.applicant_id] )
  .then(function(data) {
    res.rows= data;
    console.log('this should show one Applicant', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// post profile image
function postOneApplicantImage(req,res,next){
  console.log("req.body coming from db_apex file postOneApplicantImage", req.body)

  db.one(`update Applicants set profile_image = $1 where id = $2`,
    [req.body.profile_image, req.params.id])
  .then(function(data) {
    res.rows = data[0]
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// get applicant profile based on user_id
function applicantProfile(req,res,next){
  db.one("select * from Applicants inner join  ApplicantUsers on  Applicants.user_id = ApplicantUsers.id where Applicants.user_id = $1",
  [ req.params.uid ])
  .then(function(data) {
    res.rows= data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}



module.exports.showAllApplicants = showAllApplicants;
module.exports.uploadProfileImage = uploadProfileImage;
module.exports.postOneApplicantDetails = postOneApplicantDetails;
module.exports.showOneApplicant = showOneApplicant;
module.exports.postOneApplicantImage = postOneApplicantImage;
module.exports.applicantProfile = applicantProfile;
