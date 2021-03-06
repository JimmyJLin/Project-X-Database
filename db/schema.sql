DROP TABLE if EXISTS ApplicantUsers CASCADE;
DROP TABLE if EXISTS Employers CASCADE;
DROP TABLE if EXISTS Applicants CASCADE;
DROP TABLE if EXISTS Jobs CASCADE;
DROP TABLE if EXISTS Applications CASCADE;
DROP TABLE if EXISTS IndustryExperiences CASCADE;
DROP TABLE if EXISTS SkillsExperiences CASCADE;


CREATE TABLE ApplicantUsers (
  id SERIAL PRIMARY KEY UNIQUE,
  name VARCHAR(200),
  last_name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  password VARCHAR(200),
  type VARCHAR(200),
  saved_date TIMESTAMP
);

CREATE TABLE Employers (
  id SERIAL PRIMARY KEY UNIQUE,
  first_name VARCHAR(200),
  last_name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  password VARCHAR(200),
  company_name VARCHAR(200),
  company_address VARCHAR(200),
  company_city VARCHAR(200),
  company_state VARCHAR(200),
  company_zip VARCHAR(200),
  company_description VARCHAR(2000),
  company_website VARCHAR(100),
  company_phone_number VARCHAR(200),
  company_email VARCHAR(2000),
  company_size VARCHAR(2000),
  company_industry VARCHAR(2000),
  company_branch VARCHAR(2000),
  company_logo VARCHAR(200),
  saved_date TIMESTAMP
);


CREATE TABLE Applicants (
  id SERIAL PRIMARY KEY UNIQUE,
  user_id INTEGER REFERENCES ApplicantUsers (id) ON DELETE CASCADE,
  desired_industry text,
  desired_location text[],
  education_level VARCHAR(200),
  school text[],
  summary VARCHAR(2000),
  work_history text[],
  zipcode VARCHAR(200),
  phone_number VARCHAR(200),
  job_type text,
  experience_level VARCHAR(200),
  certifications text[],
  languages_spoken text[],
  resume_pdf VARCHAR(2000),
  profile_image VARCHAR(200),
  saved_date TIMESTAMP
);


CREATE TABLE Jobs (
  id SERIAL PRIMARY KEY UNIQUE,
  employer_id INTEGER REFERENCES Employers (id) ON DELETE CASCADE,
  title VARCHAR(200),
  description VARCHAR(3500),
  location VARCHAR(200),
  type VARCHAR(200),
  industry VARCHAR(200),
  salary VARCHAR(200),
  experience_level VARCHAR(2000),
  education_level VARCHAR(200),
  starting_date VARCHAR(200),
  status VARCHAR(20),
  saved_date TIMESTAMP
);

CREATE TABLE Applications (
  applicant_id INTEGER REFERENCES ApplicantUsers (id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES Jobs (id) ON DELETE CASCADE,
  status VARCHAR(20),
  PRIMARY KEY (applicant_id, job_id),
  saved_date TIMESTAMP

);

CREATE TABLE  IndustryExperiences(
  id SERIAL PRIMARY KEY UNIQUE,
  user_id INTEGER REFERENCES ApplicantUsers (id) ON DELETE CASCADE,
  industry_name VARCHAR(200),
  level VARCHAR(200),
  saved_date TIMESTAMP
);

CREATE TABLE  SkillsExperiences(
  id SERIAL PRIMARY KEY UNIQUE,
  user_id INTEGER REFERENCES ApplicantUsers (id) ON DELETE CASCADE,
  skill_name VARCHAR(200),
  level VARCHAR(200)
  saved_date TIMESTAMP
);
