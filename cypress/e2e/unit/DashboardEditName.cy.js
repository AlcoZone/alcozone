describe('Editar nombre de Dashboard', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    cy.visit('/auth/login');

    cy.get('[data-testid="input-txtinput-email"]').type('Plaga@gmail.com');
    cy.get('[data-testid="input-txtinput-password"]').type('plaga666');
    cy.get('[data-testid="btn-login"]').click();

    cy.get('[data-testid="login-loading"]').should('contain', 'Ingresando...');
    cy.url({ timeout: 10000 }).should('include', '/home');

    cy.get('[data-testid="menu-btn-dashboard"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    cy.contains('Cargando layout del dashboard...').should('not.exist');
    cy.wait(2000);

  });

  it('Permite editar el nombre del dashboard correctamente', () => {
    const nuevoNombre = 'CDMX 2025';

    cy.get('[data-testid="btn-dashboard-edit"]').click();

    cy.get('[data-testid="input-dashboard-name"]')
      .type('{selectall}{backspace}')
      .type(nuevoNombre);

    cy.get('[data-testid="btn-dashboard-save"]').click();

    cy.contains(nuevoNombre).should('exist');
  });

  it('No permite guardar un nombre vacío', () => {
    cy.get('[data-testid="btn-dashboard-edit"]').click();

    cy.get('[data-testid="input-dashboard-name"]')
      .type('{selectall}{backspace}');

    cy.get('[data-testid="btn-dashboard-save"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('El nombre del dashboard no puede estar vacío');
    });
  });
});
