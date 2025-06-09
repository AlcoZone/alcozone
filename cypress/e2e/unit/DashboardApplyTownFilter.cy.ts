describe("Prueba Unitaria - Aplicar filtro por alcaldía", () => {
  beforeEach(() => {
    cy.url().then((url) => {
      if (url.includes("/auth/login")) {
        cy.get('[data-testid="input-txtinput-email"]').type('plaga@gmail.com');
        cy.get('[data-testid="input-txtinput-password"]').type('plaga666');
        cy.get('[data-testid="btn-login"]').click();
      }

      cy.url().should("include", "/home");
      cy.visit("/dashboard");
    });
  });

  it("aplica el filtro por alcaldía y quita el widget del dashboard", () => {
    cy.get('[data-testid="town-filter"]')
      .as("town-filter-btn")
      .scrollIntoView()
      .should("be.visible")
      .and("contain", "Selecciona una alcaldía")
      .click();
    cy.get("@town-filter-btn").click();

    cy.get('[data-testid="town-iztapalapa"]')
      .should("be.visible")
      .and("contain", "Iztapalapa");
    cy.get('[data-testid="town-tlalpan"]')
      .should("be.visible")
      .and("contain", "Tlalpan");
    cy.get('[data-testid="town-milpa-alta"]')
      .should("be.visible")
      .and("contain", "Milpa Alta")
      .click();
    cy.get('[data-testid="report-channel-bar-chart"]')
      .find(".recharts-bar-rectangle")
      .should("have.length", 4);
    cy.get('[data-testid="report-channel-widget-description"]').should(
      "contain.text",
      "Milpa Alta"
    );

    cy.get('[data-testid="edit-dashboard"]')
      .scrollIntoView()
      .should("be.visible")
      .and("contain", "Editar")
      .click();

    cy.get('[data-testid="remove-widget"]').should("be.visible").click();
    cy.get('[data-testid="save-dashboard"]').click();
    cy.wait(2000);
  });

  it("muestra una alerta e impide aplicar filtros cuando no hay widgets agregados", () => {
    cy.get('[data-testid="town-filter"]')
      .as("town-filter-btn")
      .scrollIntoView()
      .should("be.visible")
      .and("contain", "Selecciona una alcaldía")
      .click();
    cy.get("@town-filter-btn").click();

    cy.get('[data-testid="town-tlalpan"]').should("be.visible").click();

    cy.on("window:alert", (text) => {
      expect(text).to.equal(
        "Agrega al menos un widget antes de aplicar filtros"
      );
    });
  });
});
