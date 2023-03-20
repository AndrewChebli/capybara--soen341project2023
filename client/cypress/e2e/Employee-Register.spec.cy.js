<reference types="cypress" />;
import React from "react";

describe("Register Employee", () => {
  it("should register a new employee", () => {
    cy.viewport(1980, 1080);
    cy.visit("http://localhost:3000/SignUpPage");
    cy.get("input[name=firstName]").type("CypressTester");
    cy.get("input[name=lastName]").type("CypressTester");
    cy.get("input[name=email]").type("cypress@test.com");
    cy.get("input[name=password]").type("1234");
    cy.get("input[name=confirmPassword]").type("1234");
    cy.get("input[name=companyName]").type("CypressTester");
    cy.get("input[name=jobTitle]").type("CypressTester");
    cy.get("input[name=dateStartedWork]").type("2021-01-01");
    cy.get("input[name=dateCompletedWork]").type("2021-01-01");
    // cy.get("input[name=Description]").type("CypressTester");
    cy.get("input[name=school]").type("CypressTester");
    cy.get("input[name=academicProgram]").type("CypressTester");
    cy.get("input[name=dateStartedSchool]").type("2021-01-01");
    cy.get("input[name=dateCompletedSchool]").type("2021-01-01");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/SignInPage");
    cy.visit("http://localhost:3000/SignInPage").then(() => {
      cy.request("POST", "http://localhost:8080/api/employee/login", {
        email: "cypress@test.com",
        password: "1234",
      })
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property("_id");
        })
        .then((response) => {
          const _id = response.body._id;
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
  });
});
