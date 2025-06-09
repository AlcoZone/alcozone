describe("Prueba de Integración - Navegar por el modal y Agregar un Widget", () => {
  beforeEach(() => {
    cy.visit("/");

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

  it("habilita la edición del dashboard, da clic en el componente 'Add Button', navega por el modal y agrega un widget", () => {
    cy.get('[data-testid="edit-dashboard"]')
      .scrollIntoView()
      .should("be.visible")
      .and("contain", "Editar");

    cy.get('[data-testid="edit-dashboard"]').as("edit-btn").click();
    cy.get("@edit-btn").click();

    cy.get('[data-testid="add-button"]', { timeout: 30000 })
      .should("exist")
      .and("be.visible")
      .click();

    cy.get('[data-testid="dialog"]').should("be.visible");
    cy.get('[data-testid="dialog-title"]')
      .should("be.visible")
      .and("contain", "Selecciona un widget para agregar al dashboard");
    cy.get('[data-testid="top-2-alcaldias-con-mas-accidentes-por-mes-title"]')
      .should("be.visible")
      .and("contain", "Top 2 alcaldías con más accidentes por mes");
    cy.get('[data-testid="accidentes-por-mes-title"]')
      .should("be.visible")
      .and("contain", "Accidentes por mes");
    cy.get('[data-testid="alcaldias-peligrosas-title"]')
      .should("be.visible")
      .and("contain", "Alcaldías peligrosas");
    cy.get('[data-testid="causas-de-accidentes-title"]')
      .should("be.visible")
      .and("contain", "Causas de accidentes");
    cy.get('[data-testid="tipos-de-accidentes-title"]')
      .should("be.visible")
      .and("contain", "Tipos de accidentes");
    cy.get('[data-testid="canales-de-reporte-title"]')
      .should("be.visible")
      .and("contain", "Canales de reporte");
    cy.get('[data-testid="tendencia-diaria-de-accidentes-title"]')
      .should("be.visible")
      .and("contain", "Tendencia diaria de accidentes");

    cy.get('[data-testid="alcaldias-peligrosas-widget"]').click();
    cy.get('[data-testid="alcaldias-peligrosas-title"]').should("be.visible");
    cy.get('[data-testid="alcaldias-peligrosas-description"]').should(
      "be.visible"
    );
    cy.get('[data-testid="alcaldias-peligrosas-preview"]').should("be.visible");
    cy.get('[data-testid="alcaldias-peligrosas-widget"]').click();
    cy.get('[data-testid="alcaldias-peligrosas-description"]').should(
      "not.exist"
    );
    cy.get('[data-testid="alcaldias-peligrosas-preview"]').should("not.exist");

    cy.get('[data-testid="close-button"]').should("be.visible").click();
    cy.get('[data-testid="dialog"]').should("not.exist");

    cy.get('[data-testid="add-button"]', { timeout: 30000 })
      .should("be.visible")
      .click();
    cy.get('[data-testid="canales-de-reporte-widget"]').click();
    cy.get('[data-testid="add-widget-button"]').should("be.visible").click();
    cy.get('[data-testid="dialog"]').should("not.exist");

    cy.get('[data-testid="add-button"]', { timeout: 30000 })
      .should("be.visible")
      .click();
    cy.get('[data-testid="canales-de-reporte-widget"]')
      .should("have.class", "cursor-not-allowed")
      .and("have.class", "opacity-50");
    cy.get('[data-testid="canales-de-reporte-already-added-message"]')
      .should("be.visible")
      .and("contain", "Ya agregado");
    cy.get('[data-testid="close-button"]').click();

    cy.get('[data-testid="report-channel-widget-in-dashboard"]').should(
      "be.visible"
    );

    cy.get('[data-testid="report-channel-widget-in-dashboard"]').trigger(
      "mouseover"
    );
    cy.get('[data-testid="report-channel-bar-chart"]')
      .find(".recharts-bar-rectangle")
      .should("have.length", 8);

    cy.get('[data-testid="save-dashboard"]')
      .scrollIntoView()
      .should("be.visible")
      .and("contain", "Guardar")
      .click();
    cy.wait(2000);
  });
});
