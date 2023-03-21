<reference types="cypress" />;
import React from "react";
import JobPostingSummary from "../../src/components/JobPostingSummary";

describe("Browse Jobs", () => {
  let _id = "";
  before(() => {
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

    cy.visit("http://localhost:3000/SignInPage").then(() => {
      cy.request("POST", "http://localhost:8080/api/employee/login", {
        email: "cypress@test.com",
        password: "1234",
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("_id");
        _id = response.body._id;
      });
    });
  });

  it("should browse jobs", () => {
    cy.viewport(1980, 1080);
    cy.intercept("GET", "http://localhost:8080/api/job/all").as("getJobs");
    cy.visit("http://localhost:3000/DashboardPage").then(() => {
      cy.wait("@getJobs").then((interception) => {
        expect(interception.response.statusCode).to.eq(304);
        
      });
    });

  });

  after(() => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/employee/${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
