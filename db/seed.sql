INSERT INTO ApplicantUsers (name, last_name, email, password) VALUES
('jim', 'jim-last', 'jim@jim.com', '23242sdsdsds'),
('raz', 'raz-last', 'raz@raz.com', 'dsdsdsdsds'),
('emi', 'emi-last', 'emi@emi.com', 'dsdsdsdsdsdsdsds'),
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


INSERT INTO Applicants (user_id,desired_industry,desired_location,skills,education,experience,certifications,resume_pdf,image)  VALUES
('1', 'Finance', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('3', 'Enternatinment', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png'),
('2', 'Health', 'New York', 'Programming', 'General Assembly', 'xyz company, tyes company', 'spa', 'rere.pdf','sasa.png');


INSERT INTO Jobs (employer_id,title,description,location,type,industry,salary,experience_level,education_level,starting_date, status) VALUES
('1', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
('2', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
('2', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
('3', 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active'),
(5, 'Finance Manager', 'dskdslds dsdsds dsds', 'New York', 'Full Time', 'Finance', '$120.000', '5 years','masters degree', 'asap', 'active');


INSERT INTO JTEmployersProfileAndEmployerUsers (user_id , employer_id) VALUES
(1,2),
(1,4),
(1,5);

INSERT INTO Applications (applicant_id,job_id,status) VALUES
(2,1,'pending'),
(2,3,'pending'),
(1,3,'pending'),
(1,1,'pending');

INSERT INTO Applicants (user_id,first_name,last_name,desired_industry,desired_location,school,education_level, experience_level,certifications,languages_spoken, resume_pdf, profile_image ) VALUES
('2','Jimmy','Lin','Finance','{"New York", "New Jersey", "London", "Manhattan"}','Pace University','MBA','2 Years','{"Certified Public Accountant (CPA)", "Certified Financial Analysts (CFA)", "Personal Financial Specialist (PFS)"}', '{"TURKISH", "ENGLISH", "CHINESE"}', 'resume.pdf', 'images/img_placeholders/150x150.jpg');

INSERT INTO Networking_Status (applicant_id,employer_id) VALUES
(1,1),
(1,2),
(1,3);



INSERT INTO Messages(sender,receiver,message) VALUES
(1,2,'Hi'),
(2,1,'Who are you?'),
(1,2,'I am noOne'),
(2,1,'So Silly');
