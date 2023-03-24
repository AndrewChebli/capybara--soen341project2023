<reference types="cypress" />;
import React from "react";

describe("Register Company", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/SignUpPage");
  });

  it("should register a company", () => {
    cy.get("[name=switch]").click();
    cy.get("input[name=companyName]").type("Cypress Test Company");
    cy.get("input[name=email]").type("testCompany@cypress.com");
    cy.get("input[name=password]").type("1234");
    // cy.get("input[id=description]").type("Cypress Test Company Description");
    cy.get("input[name=website]").type("www.cypress.com");
    cy.get("input[name=address]").type("Cypress Test Company Address");
    cy.get("input[name=phone]").type("123456789");
    cy.get("button[type=submit]").click();

    cy.visit("http://localhost:3000/SignInPage");
    cy.get("[name=switch]").click();
    cy.get("input[name=email]").type("testCompany@cypress.com");
    cy.get("input[name=password]").type("1234");
    cy.get("button[type=submit]").click();
    // cy.visit("htpp://localhost:3000/SingInPage");
    cy.request("POST", "http://localhost:8080/api/company/login", {
      email: "testCompany@cypress.com",
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
          url: `http://localhost:8080/api/company/${_id}`,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  });
});
