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
  db.any('select * from Applicants inner join  ApplicantUsers on  Applicants.user_id = ApplicantUsers.id')
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
    desired_industry = $1,
    education_level = $2,
    school = $3,
    work_history = $4,
    zipcode = $5,
    phone_number = $6,
    job_type = $7,
    experience_level = $8,
    resume_pdf = $9,
    profile_image = $10,
    desired_location = $11,
    certifications = $12,
    languages_spoken  = $13,
    summary = $14
  where user_id = $15 returning id;`,
    [
      req.body.desired_industry,
      req.body.education_level,
      req.body.educationArry,
      req.body.work_historyArry,
      req.body.zipcode,
      req.body.phone_number,
      req.body.job_type,
      req.body.experience_level,
      req.body.resume_pdf,
      req.body.profile_image,
      req.body.desired_location,
      req.body.certifications,
      req.body.languages_spoken,
      req.body.summary,
      req.body.user_id
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
  db.any("select * from Applicants inner join  ApplicantUsers on  Applicants.user_id = ApplicantUsers.id where Applicants.user_id = $1",
  [ req.params.uid ])
  .then(function(data) {
    res.rows= data[0];
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

function postApplicantSkillsLevels(req,res,next){
  db.none("INSERT INTO SkillsExperiences (user_id, skill_name, level) VALUES ($1,$2,$3)", [ req.body.user_id, req.body.skill_name,req.body.level ])
  .then(function(data) {
      next();
    })
  .catch(function(error){
      console.error(error);
    })
}

function getApplicantSkillsLevels(req,res,next){
  db.any( "Select * from SkillsExperiences where user_id = $1", [ req.params.user_id])
  .then(function(data) {
    res.rows= data;
    next();
    })
  .catch(function(error){
      console.error(error);
    })
}

function postApplicantIndustryLevels(req,res,next){

  db.none("INSERT INTO IndustryExperiences (user_id, industry_name, level) VALUES($1,$2,$3)", [req.body.user_id, req.body.industry_name,req.body.level ])
  .then(function(data) {
      next();
    })
  .catch(function(error){
      console.error(error);
    })
}
function getApplicantIndustryLevels(req,res,next){
  db.any( "Select * from IndustryExperiences where user_id = $1", [ req.params.user_id])
  .then(function(data) {
    res.rows= data;
    next();

    })
  .catch(function(error){
      console.error(error);
    })
}

function skillsandindustryforMatching(req,res,next){
  db.any(`select IndustryExperiences.user_id,
      array_agg(IndustryExperiences.industry_name) as industries,
      array_agg(SkillsExperiences.skill_name) as skills
       from IndustryExperiences left join SkillsExperiences
      on IndustryExperiences.user_id = SkillsExperiences.user_id
      group by IndustryExperiences.user_id`)
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
module.exports.postApplicantIndustryLevels = postApplicantIndustryLevels;
module.exports.postApplicantSkillsLevels = postApplicantSkillsLevels;
module.exports.getApplicantSkillsLevels = getApplicantSkillsLevels;
module.exports.getApplicantIndustryLevels = getApplicantIndustryLevels;
module.exports.skillsandindustryforMatching = skillsandindustryforMatching;
