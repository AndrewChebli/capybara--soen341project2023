<reference types="cypress" />;
import React from "react";

describe("Register Company", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/SignInPage");
  });

  it("should login a company", () => {

    cy.viewport(1980, 1080);
    cy.get("[name=switch]").click();
    cy.get("input[name=email]").type("google@google.com");
    cy.get("input[name=password]").type("1234");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/CompanyJobApplicantsPage").should(()=>
  {
    expect(localStorage.getItem("loginStatus")).to.eq("true");
    expect(localStorage.getItem("loginType")).to.eq("company");
  })

  });
});
