const pgp  = require( 'pg-promise' )();

if (process.env.ENVIRONMENT === 'production') {
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

// show all employers
function showAllEmployers(req,res,next){
  db.any('select * from Employers;')
  .then(function(data) {
    res.rows= data;
    console.log('Show all Employers;', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// post compnay logo
function uploadCompanyImage(req,res,next){
  req.body.filename = req.files[0].filename;
  console.log(req.body)
  req.body.filename = req.files[0].filename;
  db.none(`update Employers set
    company_logo = $/filename/
    where id = $/id/`,
      req.body)
    .then(() => {
      console.log('inserted event picture');
    })
    .catch((err) => {
      console.error('error inserting event pic: ', err);
    })

};

/*
company_name: '',
company_address: '',
company_city: '',
company_state: '',
company_zip: '',
company_description: '',
company_website: '',
company_phone_number: '',
company_email: '',
company_size: '',
company_industry: '',
company_branch: '',
company_logo: '',
company_files: []
*/
// post company profile
function postOneEmployer(req,res,next){
  db.any(`UPDATE Employers SET
    company_name = $1,
    company_address =  $2,
    company_city = $3,
    company_state =  $4,
    company_zip =  $5,
    company_description =  $6,
    company_phone_number =  $7,
    company_website = $8,
    company_email = $9,
    company_size = $10,
    company_industry =  $11,
    company_branch = $12,
    company_logo =  $13
    WHERE id = $14 RETURNING id;`,
    [
      req.body.company_name,
      req.body.company_address,
      req.body.company_city,
      req.body.company_state,
      req.body.company_zip,
      req.body.company_description,
      req.body.company_phone_number,
      req.body.company_website,
      req.body.company_email,
      req.body.company_size,
      req.body.company_industry,
      req.body.company_branch,
      req.body.company_logo,
      req.body.id
    ])
  .then(function(data) {
    res.rows = data[0]
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// post one employer profile image
function postOneEmployerImage(req,res,next){
  db.one(`update Employers set company_logo = $1 where id = $2`,
    [req.body.company_logo, req.params.id])
  .then(function(data) {
    res.rows = data[0]
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// get one profile
function showOneEmployer(req,res,next){
  db.any('select * from Employers where id = $1;', [req.params.employer_id] )
  .then(function(data) {
    res.rows= data;
    console.log('Show one Employers', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

function employerProfile(req,res,next){
  db.any('select * from Employers where id = $1;', [req.params.uid] )
  .then(function(data) {
    res.rows= data;
    console.log('Show one Employers', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

module.exports.showAllEmployers = showAllEmployers;
module.exports.uploadCompanyImage = uploadCompanyImage;
module.exports.postOneEmployer = postOneEmployer;
module.exports.postOneEmployerImage = postOneEmployerImage;
module.exports.showOneEmployer = showOneEmployer;
module.exports.employerProfile = employerProfile;
