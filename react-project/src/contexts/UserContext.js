import React from 'react';

const UserContext = React.createContext();

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  password: '********',
  city: 'New York',
  country: 'United States',
  education: [
    {
      school: 'Harvard University',
      academicProgram: 'Computer Science',
      dateStarted: '2015-09-01',
      dateCompleted: '2019-05-01',
    },
    {
      school: 'Stanford University',
      academicProgram: 'Mathematics',
      dateStarted: '2011-09-01',
      dateCompleted: '2015-05-01',
    },
  ],
  workExperience: [
    {
      position: 'Software Engineer',
      company: 'Google',
      dateStarted: '2019-06-01',
      dateCompleted: null,
    },
    {
      position: 'Data Analyst',
      company: 'Amazon',
      dateStarted: '2016-06-01',
      dateCompleted: '2019-05-01',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Python'],
  photo: null,
};

export { UserContext, user };
