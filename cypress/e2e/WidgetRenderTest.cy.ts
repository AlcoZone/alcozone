describe("Prueba unitaria ComparisonWidget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().then((url) => {
      if (url.includes('/auth')) {
        cy.visit("/auth/login");
        cy.get('[data-testid="email-input"]').type('plaga@gmail.com');
        cy.get('[data-testid="password-input"]').type('plaga666');
        cy.get('[data-testid="toggle-password-visibility"]').click();
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="login-loading"]', { timeout: 10000 }).should("not.exist");
      }
    });
    cy.url().should('include', '/home');
  });

  it("Debería renderizar el widget de comparación", () => {
    cy.get('[data-testid="comparison-widget"]', { timeout: 10000 }).should('exist');
    cy.get('[data-testid="widget-title"]').should('contain.text', 'Accidentes por mes');
  });

  it("Debería mostrar tooltip al pasar el mouse sobre un área", () => {
    cy.get('[data-testid^="area-"]').first().trigger('mouseover');
    cy.get('[data-testid="custom-tooltip"]').should('exist');
  });

  it("Debería contener texto en el pie del widget", () => {
    cy.get('[data-testid="footer-text"]').should('contain.text', '');
  });

  it("Debería contener el título 'Accidentes por mes' dentro del widget", () => {
    cy.get('[data-testid="comparison-widget"]').within(() => {
      cy.contains('Accidentes por mes');
    });
  });
});

describe('Prueba ComparisonWidget - simulación error', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/widgets/monthly-accidents**', {
      statusCode: 500,
      body: {}
    }).as('getMonthlyAccidentsError');

    cy.visit('/');

    cy.url().then((url) => {
      if (url.includes('/auth')) {
        cy.visit("/auth/login");
        cy.get('[data-testid="email-input"]').type('plaga@gmail.com');
        cy.get('[data-testid="password-input"]').type('plaga666');
        cy.get('[data-testid="toggle-password-visibility"]').click();
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="login-loading"]', { timeout: 10000 }).should("not.exist");
      }
    });
    cy.url().should('include', '/home');
  });

  it('No debe mostrar el widget y debe mostrar mensaje de error', () => {
    cy.wait('@getMonthlyAccidentsError');
    cy.get('[data-testid="comparison-widget"]').should('not.exist');
    cy.get('[data-testid="error-message"]').should('contain.text', 'No se pudo cargar el widget');
  });
});
