INSERT INTO ApplicantUsers (name, last_name, email, password) VALUES
('jim', 'jim-last', 'jim@jim.com', '23242sdsdsds'),
('raz', 'raz-last', 'raz@raz.com', 'dsdsdsdsds'),
('emi', 'emi-last', 'emi@emi.com', 'dsdsdsdsdsdsdsds'),
('emi', 'emi-last', 'emi1@emi.com', 'dsdsdsdsdsdsdsds'),
('emi', 'emi-last', 'emi2@emi.com', 'dsdsdsdsdsdsdsds'),
('emi', 'emi-last', 'emi3@emi.com', 'dsdsdsdsdsdsdsds'),
('emi', 'emi-last', 'emi4@emi.com', 'dsdsdsdsdsdsdsds'),
('emine', 'emine-last', 'emine@emine.com', '44dsdsds');

INSERT INTO Employer (employer_id, name, last_name, email, password) VALUES
(1,'jim', 'jim-last', 'jim@jim.com', '23242sdsdsds'),
(2,'raz', 'raz-last', 'raz@raz.com', 'dsdsdsdsds'),
(4,'emi', 'emi-last', 'emi@emi.com', 'dsdsdsdsdsdsdsds'),
(2,'emine', 'emine-last', 'emine@emine.com', '44dsdsds');

INSERT INTO Employers (
  company_name,
  company_address,
  company_city,
  company_state,
  company_zip,
  company_description,
  company_website,
  company_phone_number,
  company_email,
  company_size,
  company_industry,
  company_branch,
  company_logo
) VALUES
(
  'UBS Investment Bank',
  '1 UBS Drive',
  'New YOrk',
  'NY',
  '10012',
  'UBS is a global firm providing financial services in over 50 countries. Visit our site to find out what we offer in your country.',
  'https://www.ubs.com',
  '8882793343',
  'info@ubs.com',
  'Large Cap',
  'Finance',
  'New York',
  'images/company_logo/ubs.png'
),
(
  'Company B',
  'B Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyB.com',
  '21221212121',
  'B@B.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
),
(
  'Company C',
  'C Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyC.com',
  '21221212121',
  'C@C.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
),
(
  'Company D',
  'D Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyD.com',
  '21221212121',
  'D@D.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
),
(
  'Company E',
  'E Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyE.com',
  '21221212121',
  'E@E.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
);


UPDATE Applicants SET
  desired_industry ='Finance',
  education_level = $2,
  school = $3,
  work_history = $4,
  zipcode = $5,
  phone_number = $6,
  job_type = $7,
  job_skills = $8,
  job_industry = $9,
  experience_level = $10,
  resume_pdf = $11,
  profile_image = $12,
  desired_location = $13,
  certifications = $14,
  languages_spoken  = $15
where  user_id = $16 returning id;




INSERT INTO Applicants (user_id,desired_industry,desired_location,skills,education,experience,certifications,resume_pdf,image)  VALUES
('1', 'Finance', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('2', 'Enternatinment', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('3', 'Enternatinment', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('4', 'Enternatinment', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('5', 'Enternatinment', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('6', 'Enternatinment', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('7', 'Health', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png');


INSERT INTO Jobs (employer_id,title,description,location,type,industry,salary,experience_level,education_level,starting_date, status) VALUES
('1', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
('2', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
('2', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
('3', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
(5, 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active');


INSERT INTO Applicants (user_id,desired_industry,desired_location,school,education_level, experience_level,certifications,languages_spoken, resume_pdf, profile_image ) VALUES
('2','Finance','{"New York", "New Jersey", "London", "Manhattan"}','Pace University','MBA','2 Years','{"Certified Public Accountant (CPA)", "Certified Financial Analysts (CFA)", "Personal Financial Specialist (PFS)"}', '{"TURKISH", "ENGLISH", "CHINESE"}', 'resume.pdf', 'images/img_placeholders/150x150.jpg');



select
      user_id,
      array_agg(industry_name) as industries
      from IndustryExperiences group by (user_id)

    select
      user_id,
      array_agg(skill_name) as skilss
      from SkillsExperiences group by (user_id)




select
base.user_id, base.name, base.last_name, base.email,
base.desired_industry,base.desired_location,base.school,
base.education_level, base.experience_level,base.certifications,
base.languages_spoken, base.resume_pdf, base.profile_image,
base.industries, base.skills
from
( select IndustryExperiences.user_id,
    array_agg(IndustryExperiences.industry_name) as industries,
    array_agg(SkillsExperiences.skill_name) as skills
     from IndustryExperiences left join SkillsExperiences
    on IndustryExperiences.user_id = SkillsExperiences.user_id
    group by IndustryExperiences.user_id
  ) as base
    right join Applicants on base.user_id = Applicants.id group by base.user_id
    right join ApplicantUsers on base.user_id = ApplicantUsers.user_id



select
base.id, base.name, base.last_name, base.email,base.summary,
base.desired_industry, base.desired_location , base.school,
base.education_level, base.experience_level,base.certifications,
base.languages_spoken, base.resume_pdf, base.profile_image,
array_agg(base.industry_name) as industries,
array_agg(base.skill_name ) as skills
from
(
    select ApplicantUsers.id as ui, name, last_name, email, summary
        from ApplicantUsers
          inner join Applicants on Applicants.user_id = ApplicantUsers.id group by ui, summary as helper
          inner join IndustryExperiences on IndustryExperiences.user_id = ApplicantUsers.id
          inner join SkillsExperiences on SkillsExperiences.user_id = ApplicantUsers.id
) as base
group by base.id, base.name, base.last_name, base.email,base.summary,
base.desired_industry, base.desired_location , base.school,
base.education_level, base.experience_level,base.certifications,
base.languages_spoken, base.resume_pdf, base.profile_image,
base.industry_name, base.skill_name



select helper.ui, helper.name, helper.last_name, helper.email,helper.summary,
helper.desired_industry, helper.desired_location , helper.school,
helper.education_level, helper.experience_level,helper.certifications,
helper.languages_spoken, helper.resume_pdf, helper.profile_image,
array_agg(IndustryExperiences.industry_name) as industries,
array_agg(SkillsExperiences.skill_name ) as skills
from
(select ApplicantUsers.id as ui, name, last_name, email, summary,
  desired_industry, desired_location , school,
  education_level, experience_level, certifications,
  languages_spoken, resume_pdf, profile_image
    from ApplicantUsers
      left join Applicants on Applicants.user_id = ApplicantUsers.id
      group by ui, summary,
      desired_industry, desired_location , school,
      education_level, experience_level, certifications,
      languages_spoken, resume_pdf, profile_image ) as helper
      right join IndustryExperiences on IndustryExperiences.user_id = helper.ui
      right join SkillsExperiences on SkillsExperiences.user_id = helper.ui
    group by helper.ui, helper.name, helper.last_name, helper.email,helper.summary,
    helper.desired_industry, helper.desired_location , helper.school,
    helper.education_level, helper.experience_level,helper.certifications,
    helper.languages_spoken, helper.resume_pdf, helper.profile_image



-- SELECT
--   helper.name, helper.location, helper.description, helper.besttimetodo,  helper.category,  helper.image, helper.wish, helper.haveBeen
--   from
--   (SELECT id, name, location, description, besttimetodo,category, image ,
--     wishlist.user_id, wishlist.wish, wishlist.haveBeen from attractions
--     left join wishlist on attractions.id = wishlist.attraction_id ) as helper
--
--     left join users on helper.user_id = users.id
