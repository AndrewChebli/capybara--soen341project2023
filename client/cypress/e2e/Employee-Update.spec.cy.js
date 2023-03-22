<reference types="cypress" />;
import React from "react";
import dummyString from "../downloads/dummyString";

describe("Updates Employee", () => {
  let _id;

  before(() => {
    cy.request("POST", "http://localhost:8080/api/employee/register", {
      firstName: "CypressTester",
      lastName: "CypressTester",
      email: "cypress@test.com",
      password: "1234",
      resume: dummyString.resume,
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
    })
      .then((response) => {
        expect(response.status).to.eq(201);
      })
      .then(() => {
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
  });

  it("should update employee", () => {
    expect(_id).to.not.be.undefined;
    cy.viewport(1980, 1080);
    cy.visit("http://localhost:3000/SignInPage");
    cy.get("input[name=email]").type("cypress@test.com");
    cy.get("input[name=password]").type("1234");
    cy.get("button[type=submit]").click().then(()=> 
    {
      cy.wait(1000);
      cy.visit("http://localhost:3000/EditProfilePage");
      cy.wait(1000);
      cy.get("input[name=firstName]").clear().type("Changed Name");
    cy.get("input[name=lastName]").clear().type("Changed LastName");
    cy.get("button[type=submit]").click();
    }).then(() => {
    cy.wait(1000);
    cy.visit("http://localhost:3000/ProfilePage");
    cy.get("[id=profileName]").should("contain", "Changed Name");
    });
  });

  after(() => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:8080/api/employee/${_id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
