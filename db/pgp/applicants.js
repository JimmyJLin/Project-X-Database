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
  db.any('select helper.ui, helper.work_history, helper.name, helper.last_name, helper.email,helper.summary,\
  helper.desired_industry, helper.desired_location , helper.school,\
  helper.education_level, helper.experience_level,helper.certifications,\
  helper.languages_spoken, helper.resume_pdf, helper.profile_image,\
  array_agg(IndustryExperiences.industry_name) as industries,\
  array_agg(SkillsExperiences.skill_name ) as skills\
  from\
  (select ApplicantUsers.id as ui, work_history, name, last_name, email, summary,\
    desired_industry, desired_location , school,\
    education_level, experience_level, certifications,\
    languages_spoken, resume_pdf, profile_image\
      from ApplicantUsers\
        left join Applicants on Applicants.user_id = ApplicantUsers.id\
        group by ui, work_history, summary,\
        desired_industry, desired_location , school,\
        education_level, experience_level, certifications,\
        languages_spoken, resume_pdf, profile_image ) as helper \
        inner join IndustryExperiences on IndustryExperiences.user_id = helper.ui\
        inner join SkillsExperiences on SkillsExperiences.user_id = helper.ui\
      group by helper.ui, helper.work_history, helper.name, helper.last_name, helper.email,helper.summary,\
      helper.desired_industry, helper.desired_location , helper.school,\
      helper.education_level, helper.experience_level,helper.certifications,\
      helper.languages_spoken, helper.resume_pdf, helper.profile_image\
      ;\
  ')
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

// upload profile pdf
function uploadResume(req,res,next){
  req.body.filename = req.files[0].filename;
  console.log(req.body)
  req.body.filename = req.files[0].filename;
  db.none(`update Applicants set
    resume_pdf = $/filename/
    where id = $/id/`,
      req.body)
    .then(() => {
      console.log('inserted resume');
    })
    .catch((err) => {
      console.error('error uploading resume: ', err);
    })
};

// post applicant profile
function postOneApplicantDetails(req,res,next){
  console.log("req.body coming from db_apex file postOneApplicant", req.body)
  db.any(`UPDATE Applicants SET
    desired_industry = $1,
    school = $2,
    work_history = $3,
    zipcode = $4,
    phone_number = $5,
    job_type = $6,
    experience_level = $7,
    desired_location = $8,
    certifications = $9,
    languages_spoken  = $10,
    summary = $11
  where user_id = $12 returning id;`,
    [
      req.body.desired_industry,
      req.body.educationArry,
      req.body.work_historyArry,
      req.body.zipcode,
      req.body.phone_number,
      req.body.job_type,
      req.body.experience_level,
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

// function skillsandindustryforMatching(req,res,next){
//   db.any(`select IndustryExperiences.user_id,
//       array_agg(IndustryExperiences.industry_name) as industries,
//       array_agg(SkillsExperiences.skill_name) as skills
//        from IndustryExperiences left join SkillsExperiences
//       on IndustryExperiences.user_id = SkillsExperiences.user_id
//       group by IndustryExperiences.user_id, IndustryExperiences.industry_name, SkillsExperiences.skill_name`)
//       .then(function(data) {
//         res.rows.skills= data;
//         next();
//         })
//       .catch(function(error){
//           console.error(error);
//     })
//   }



module.exports.showAllApplicants = showAllApplicants;
module.exports.uploadProfileImage = uploadProfileImage;
module.exports.uploadResume = uploadResume;
module.exports.postOneApplicantDetails = postOneApplicantDetails;
module.exports.showOneApplicant = showOneApplicant;
module.exports.postOneApplicantImage = postOneApplicantImage;
module.exports.applicantProfile = applicantProfile;
module.exports.postApplicantIndustryLevels = postApplicantIndustryLevels;
module.exports.postApplicantSkillsLevels = postApplicantSkillsLevels;
module.exports.getApplicantSkillsLevels = getApplicantSkillsLevels;
module.exports.getApplicantIndustryLevels = getApplicantIndustryLevels;
// module.exports.skillsandindustryforMatching = skillsandindustryforMatching;
