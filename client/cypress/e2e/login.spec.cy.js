<reference types="cypress" />
import React from "react"



describe("Login", () => {

  beforeEach(()=>
  {
    cy.visit("http://localhost:3000/SignInPage")
  })
  
  it("should login the user", () => {
    cy.viewport(1980, 1080);
    cy.get("input[name=email]").type("test@test.com");
    cy.get("input[name=password]").type("1234");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/DashboardPage").should(()=>{
      expect(localStorage.getItem("loginStatus")).to.eq("true");
    });
  })
})