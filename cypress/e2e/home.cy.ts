describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads and shows the welcome text", () => {
    cy.contains("Welcome to the E-Commerce Store!").should("be.visible");
  });

  it("shows the featured products section", () => {
    cy.contains("Featured Products").should("be.visible");
  });

  it("products load from the api", () => {
    // just wait for at least one card to show up
    cy.get(".MuiCard-root", { timeout: 10000 }).should("have.length.greaterThan", 0);
  });

  it("clicking a product goes to the detail page", () => {
    cy.get(".MuiCard-root", { timeout: 10000 }).first().click();
    cy.url().should("include", "/product/");
  });

  it("filter dropdown is visible", () => {
    cy.contains("Filter").should("be.visible");
  });

  it("sort dropdown is visible", () => {
    cy.contains("Sort").should("be.visible");
  });

  it("selecting a filter updates the url", () => {
    cy.get(".MuiCard-root", { timeout: 10000 }).should("have.length.greaterThan", 0);
    // open the filter select (second select on page)
    cy.get(".MuiSelect-select").eq(1).click();
    cy.get(".MuiMenuItem-root").not('[data-value=""]').first().click();
    cy.url().should("include", "category=");
  });

  it("selecting a sort updates the url", () => {
    cy.get(".MuiSelect-select").eq(0).click();
    cy.contains("Price: Low to High").click();
    cy.url().should("include", "sort=price_asc");
  });

  it("refreshing the page keeps the filters applied", () => {
    cy.visit("/?sort=price_asc");
    cy.get(".MuiSelect-select").eq(0).should("contain", "Price: Low to High");
  });
});
