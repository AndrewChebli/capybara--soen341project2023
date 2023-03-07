<reference types="cypress" />
import React from "react"

describe('Pages', () => {
  it('should visit the home page', () => {
    cy.visit(Cypress.config().baseUrl)
  })
})