<reference types="cypress" />;
import React from "react";

describe("Create Job", () => {
  let companyID = "";
  let jobID = "";

  before(() => {
    cy.request("POST", "http://localhost:8080/api/company/register", {
      companyName: "Cypress Test Company",
      email: "testCompany@cypress.com",
      password: "1234",
      description: "Cypress Test Company Description",
      website: "www.cypress.com",
      address: "Cypress Test Company Address",
      phone: "123456789",
      jobs: [],
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    cy.request("POST", "http://localhost:8080/api/company/login", {
      email: "testCompany@cypress.com",
      password: "1234",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("_id");
      companyID = response.body._id;
    });
  });

  it("Should create a job", () => {
    cy.visit("http://localhost:3000/SignInPage").then(() => {
      cy.get("[name=switch]").click();
      cy.get("input[name=email]").type("testCompany@cypress.com");
      cy.get("input[name=password]").type("1234");
      cy.get("button[type=submit]").click().then(() => {
        cy.wait(1000);
      });


    }).then(()=> {
      cy.visit("http://localhost:3000/CreateJobPostingPage").then(() => {
        cy.intercept("POST", "http://localhost:8080/api/job/add")
          .as("createJob")
          .then(() => {
            cy.get("input[name=title]").type("Cypress Test Job");
            cy.get("textarea[name=description]").type(
              "Cypress Test Job Description"
            );
            cy.get("input[name=location]").type("Cypress Test Job Location");
            cy.get("input[name=salary]").type("1");
            cy.get("textarea[name=requirement]").type(
              "Cypress Test Job Requirements"
            );
            cy.get("textarea[name=benefit]").type("Cypress Test Job Benefits");
            cy.get("input[name=deadline]").type("2021-12-31");
            cy.get("input[name=remote]").type("hybrid");
            cy.get("input[name=type]").type("full-time");
            cy.get("button[type=submit]").click();
          });
        cy.wait("@createJob").then((interception) => {
          expect(interception.response.statusCode).to.eq(201);
          jobID = interception.response.body.job._id;
        });
        cy.intercept("GET", `http://localhost:8080/api/company/getCompanyJobs/${companyID}`).as("getCompanyJobs");
        cy.visit("http://localhost:3000/CompanyJobApplicantsPage").then(() => {
          cy.wait("@getCompanyJobs").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.jobs[0].title).to.eq("Cypress Test Job");
          });
        });
      });
    });
  });

  after(() => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/company/${companyID}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/job/remove/${jobID}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    }
    );
  });
});
