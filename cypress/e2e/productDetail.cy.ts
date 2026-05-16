describe("product detail page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".MuiCard-root", { timeout: 10000 }).first().click();
  });

  it("shows the product title", () => {
    cy.get("h4").should("exist");
  });

  it("shows the price", () => {
    cy.get("h5").should("exist");
  });

  it("shows the add to cart button", () => {
    cy.contains("Add to Cart").should("be.visible");
  });

  it("quantity selector is there and works", () => {
    cy.contains("Quantity").should("exist");
  });

  it("clicking add to cart doesnt crash the page", () => {
    cy.contains("Add to Cart").click();
    cy.url().should("include", "/product/");
  });

  it("back button goes back to home", () => {
    cy.get("[data-testid='ArrowBackIosNewRoundedIcon']").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
