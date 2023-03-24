<reference types="cypress" />;
import React from "react";

describe("Apply to a job", () => {
  let companyID = "";
  let employeeID = "";
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
    })
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("_id");
        companyID = response.body._id;
      })
      .then(() => {
        cy.request("POST", "http://localhost:8080/api/job/add", {
          company_id: companyID,
          title: "Cypress Job Tester",
          description: "Cypress Job Tester Description",
          location: "Cypress Job Tester Location",
          salary: 1,
          company: "Cypress Test Company",
          requirements: "Cypress Job Tester Requirements",
          benefits: "Cypress Job Tester Benefits",
          Dday: 1,
          Dmonth: 1,
          Dyear: 1,
        }).then((response) => {
          expect(response.status).to.eq(201);
          jobID = response.body.job._id;
        });
      })
      .then(() => {
        cy.request("POST", "http://localhost:8080/api/employee/register", {
          firstName: "CypressTester",
          lastName: "CypressTester",
          email: "cypress@test.com",
          password: "1234",
          resume: "CypressTester",
          resumeName: "CypressTester",
          experience: {
            company: "CypressTester",
            title: "CypressTester",
            start: "2021-01-01",
            end: "2021-01-01",
          },
          education: {
            school: "CypressTester",
            degree: "CypressTester",
            start: "2021-01-01",
            end: "2021-01-01",
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
        });
      })
      .then(() => {
        cy.request("POST", "http://localhost:8080/api/employee/login", {
          email: "cypress@test.com",
          password: "1234",
        })
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("_id");
            employeeID = response.body._id;
          })
          .then(() => {
            cy.request("POST", "http://localhost:8080/api/job/add/applicant/", {
              job_id: jobID,
              applicant_id: employeeID,
            }).then((response) => {
              expect(response.status).to.eq(200);
            });
          })
          .then(() => {
            cy.request(
              "POST",
              "http://localhost:8080/api/company/selectApplicant/",
              {
                job_id: jobID,
                applicant_id: employeeID,
              }
            ).then((response) => {
              expect(response.status).to.eq(200);
            });
          });
      });
  });

  it("should select an applicant", () => {
    cy.visit("http://localhost:3000/SignInPage")
      .then(() => {
        cy.get("input[name=email]").type("cypress@test.com");
        cy.get("input[name=password]").type("1234");
        cy.get("button[type=submit]").click();
      })
      .then(() => {
        cy.intercept(
          "GET",
          `http://localhost:8080/api/employee/getAllOffers/${employeeID}`
        )
          .as("getOffers")
          .then(() => {
            cy.visit("http://localhost:3000/OffersPage").then(() => {
              cy.wait("@getOffers").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property("offers");
                expect(interception.response.body.offers[0])
                  .to.have.property("_id")
                  .and.to.eq(jobID);
              });
            });
          });
      });
  });

  after(() => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/job/remove/${jobID}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/employee/${employeeID}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/company/${companyID}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
