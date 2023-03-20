<reference types="cypress" />;
import React from "react";
import '@testing-library/cypress/add-commands'


describe("Selected Employee", () => {


  it("should show the selected employee", () => {
    cy.fixture("tester").then((tester) => {
    cy.viewport(1980, 1080);  
    cy.visit("http://localhost:3000/SignInPage");
    cy.get("[name=switch]").click();
    cy.get("input[name=email]").type("google@google.com");
    cy.get("input[name=password]").type(tester.password);
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/CompanyJobApplicantsPage").should(()=>
  {
    expect(localStorage.getItem("loginStatus")).to.eq("true");

    expect(localStorage.getItem("loginType")).to.eq("company");
  })
  cy.get
 


    });
  }); 
});