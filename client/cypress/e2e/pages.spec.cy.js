<reference types="cypress" />
import React from "react"



describe('Pages', () => {
  it('should visit the home page', () => {
    cy.visit("http://localhost:3000")
  })
})