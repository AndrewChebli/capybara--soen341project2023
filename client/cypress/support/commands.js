// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

function registerEmployee(test){
  cy.visit('http://localhost:3000/SignUpPage');
  cy.get('input[name=firstName]').type(test.firstName);
  cy.get('input[name=lastName]').type(test.lastName);
  cy.get('input[name=email]').type(test.email);
  cy.get('input[name=password]').type(test.password);
  cy.get('input[name=confirmPassword]').type(test.confirmPassword);
  cy.get('input[name=companyName]').type(test.companyName);
  cy.get('input[name=jobTitle]').type(test.jobTitle);

  cy.get('input[name=dateStartedWork]').type(test.dateStartedWork);
  cy.get('input[name=dateCompletedWork]').type(test.dateCompletedWork);
  cy.get('input[name=school]').type(test.school);
  cy.get('input[name=academicProgram]').type(test.academicProgram);
  cy.get('input[name=dateStartedSchool]').type(test.dateStartedSchool);
  cy.get('input[name=dateCompletedSchool]').type(test.dateCompletedSchool);
  cy.get('button[type=submit]').click();
  return(true);
}

Cypress.Commands.add('loginEmployee', (email, password) => {
  cy.visit('http://localhost:3000/SignInPage');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});

Cypress.Commands.add('loginCompany', (email, password) => {
  cy.visit('http://localhost:3000/SignInPage');
  cy.get('[name=switch]').click();
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});

Cypress.Commands.add("registerEmployee", registerEmployee);

import '@testing-library/cypress/add-commands'