<reference types="cypress" />;
import React from "react";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/SignInPage");
  });

  it("should login the user", () => {
    cy.get("input[name=email]").type("test@test.com");
    cy.get("input[name=password]").type("1234");
    cy.get("button[type=submit]").click();
    cy.url()
      .should("include", "/DashboardPage")
      .should(() => {
        expect(localStorage.getItem("loginStatus")).to.eq("true");
      });
  });

  it("should fail to login the user", () => {
    cy.intercept("POST", "http://localhost:8080/api/employee/login")
      .as("login");

    cy.visit("http://localhost:3000/SignInPage");
    cy.get("input[name=email]").type("notexisting");
    cy.get("input[name=password]").type("1234");
    cy.get("button[type=submit]").click().then(() => {
      cy.wait("@login").then((interception) => {
        expect(interception.response.statusCode).to.eq(401);
      });
    });
  });
});
