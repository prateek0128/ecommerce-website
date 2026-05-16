describe("cart", () => {
  const addFirstProductToCart = () => {
    cy.visit("/");
    cy.get(".MuiCard-root", { timeout: 10000 }).first().click();
    cy.url().should("include", "/product/");
    cy.contains("Add to Cart", { timeout: 8000 }).click();
    cy.visit("/cart");
  };

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("shows empty cart message when nothing is added", () => {
    cy.visit("/cart");
    cy.contains("Your cart is currently empty.").should("be.visible");
  });

  it("added product shows up in cart", () => {
    addFirstProductToCart();
    cy.get(".MuiCard-root", { timeout: 6000 }).should("have.length.greaterThan", 0);
  });

  it("cart shows the total price", () => {
    addFirstProductToCart();
    cy.contains("Rs.", { timeout: 6000 }).should("exist");
  });

  it("removing an item from cart works", () => {
    addFirstProductToCart();
    cy.get("[data-testid='RemoveShoppingCartRoundedIcon']", { timeout: 6000 }).first().click();
    cy.contains("Your cart is currently empty.", { timeout: 3000 }).should("be.visible");
  });

  it("cart persists after page refresh", () => {
    addFirstProductToCart();
    cy.reload();
    cy.get(".MuiCard-root", { timeout: 6000 }).should("have.length.greaterThan", 0);
  });
});
