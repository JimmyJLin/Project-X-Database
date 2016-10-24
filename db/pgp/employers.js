const pgp  = require( 'pg-promise' )();
console.log('employers database connected')

if(process.env.ENVIRONMENT === 'production') {
  let cn = process.env.DATABASE_URL
} else {
  let cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
}

const cn = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
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


module.exports.showAllEmployers = showAllEmployers;
