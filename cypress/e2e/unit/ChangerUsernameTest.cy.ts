describe("Prueba integración pantalla Mi cuenta", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.url().then((url) => {
      if (url.includes('/auth/login')) {
        cy.get('[data-testid="email-input"]').type('plaga@gmail.com');
        cy.get('[data-testid="password-input"]').type('plaga666');
        cy.get('[data-testid="toggle-password-visibility"]').click();
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="login-loading"]', { timeout: 10000 }).should("not.exist");
      }

      cy.url().should('include', '/home');
    });
  });

  it("Debería renderizar correctamente el widget de comparación", () => {
    cy.get('[data-testid="account-button"]').should('be.visible');
  });

  it("Cambiar de usuario y verificar", () => {
    cy.get('[data-testid="account-button"]').click();
    cy.url().should('include', '/account');

    cy.get('[data-testid="welcome-message"]').should('contain', 'Bienvenido,');
    cy.get('[data-testid="display-name"]').should('contain', 'Mariana'); //should write the actual username !!!
    cy.get('[data-testid="email"]').should('contain', 'plaga@gmail.com'); //should write the actual mail !!!
    cy.get('[data-testid="role"]').should('contain', 'admin'); //should write the actual role !!!

    cy.get('[data-testid="change-user-button"]').click();
    cy.get('[data-testid="new-username-input"]').clear().type('Mariana'); //add the new username
    cy.get('[data-testid="save-button"]').click();

    cy.get('[data-testid="display-name"]').should('contain', 'Mariana'); //add the new username
  });
});
