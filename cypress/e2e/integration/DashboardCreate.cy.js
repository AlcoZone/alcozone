describe('Crear un nuevo Dashboard y editar su nombre', () => {
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
  
    it('Permite crear un nuevo dashboard con nombre válido', () => {
      const nuevoNombre = 'Dashboard Test';
  
      cy.get('[data-testid="btn-dashboard-selector"]').click();
      cy.get('[data-testid="btn-new-dashboard"]').click();
  
      cy.get('[data-testid="input-dashboard-name"]')
        .type('{selectall}{backspace}')
        .type(nuevoNombre);
  
      cy.get('[data-testid="btn-dashboard-save"]').click();
  
      cy.contains(nuevoNombre).should('exist');
    });
  });
  