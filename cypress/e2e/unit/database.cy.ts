describe("Prueba integración página Database", () => {
  beforeEach(() => {
    cy.visit("/");

    // Login si es necesario
    cy.url().then((url) => {
      if (url.includes('/auth/login')) {
        cy.get('[data-testid="email"]').type('plaga@gmail.com');
        cy.get('[data-testid="password"]').type('plaga666');
        cy.get('[data-testid="btn-login"]').click();
        cy.get('[data-testid="login-loading"]', { timeout: 10000 }).should("not.exist");
      }
      cy.url().should('include', '/');
    });

    // Navegar a la página de Database
    cy.visit("database");
  });

  it("Debe mostrar el título y total de accidentes", () => {
    cy.get('[data-testid="page-title"]').should("contain", "Accidentes");
    cy.get('[data-testid="total-accidents"]').should("contain", "Total:");
  });

  it("Debe mostrar la tabla con datos después de cargar", () => {
    cy.get('[data-testid="loading-message"]').should("exist");
    cy.get('[data-testid="loading-message"]', { timeout: 10000 }).should("not.exist");
    cy.get('[data-testid="table-container"]').should("be.visible");
    cy.get("table tbody tr").its('length').should('be.gt', 0); // que haya filas
  });

  it("Debe filtrar datos según las fechas seleccionadas", () => {
    // Cambiar fechas a un rango válido
    cy.get('[data-testid="start-date-input"]').clear().type("2022-01-01");
    cy.get('[data-testid="end-date-input"]').clear().type("2022-01-02");
    cy.get('[data-testid="search-button"]').click();

    // Esperar que cargue y mostrar resultados
    cy.get('[data-testid="loading-message"]').should("exist");
    cy.get('[data-testid="loading-message"]', { timeout: 10000 }).should("not.exist");

    cy.get('[data-testid="table-container"]').should("be.visible");
    cy.get("table tbody tr").its('length').should('be.gt', 0);

    // Verificar que la fecha de la primera fila esté dentro del rango
    cy.get("table tbody tr:first-child td:first-child")
      .invoke('text')
      .then((text) => {
        // Las fechas están en formato DD-MM-YYYY según tu código
        const [day, month, year] = text.trim().split("-");
        const rowDate = new Date(`${year}-${month}-${day}`);
        expect(rowDate).to.be.within(new Date("2022-01-01"), new Date("2022-01-15"));
      });
  });
});
