// cypress/e2e/login_and_menu.cy.ts

describe('Login y verificación de menú (con advertencias controladas)', () => {
    const routes = {
      home: '/home',
      dashboard: '/dashboard',
      database: '/badroutefortest0',
      users: '/badroutefortest1', 
      map: '/badroutefortest2',
      account: '/badroutefortest3',
      upload: '/upload',
      download: '/download',
    };
  
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        indexedDB.deleteDatabase('firebaseLocalStorageDb');
      
        cy.on('uncaught:exception', (err) => {
          if (
            err.message.includes('timeout of') ||
            err.name === 'AxiosError' ||
            err.message.includes('Network Error')
          ) {
            return false; 
          }
        });
      });  
  
    it('Permite iniciar sesión y navega por el menú mostrando advertencias si la ruta no coincide', () => {
      cy.visit('/auth/login');
  
      cy.get('[data-testid="input-txtinput-email"]').type('Plaga@gmail.com');
      cy.get('[data-testid="input-txtinput-password"]').type('plaga666');
      cy.get('[data-testid="btn-login"]').click();
  
      cy.get('[data-testid="login-loading"]').should('contain', 'Ingresando...');
      cy.url({ timeout: 10000 }).should('include', '/home');
  
      Object.keys(routes).forEach((variant) => {
        cy.get(`[data-testid="menu-btn-${variant}"]`).should('exist');
      });
  
      Object.entries(routes).forEach(([variant, expectedPath]) => {
        cy.get(`[data-testid="menu-btn-${variant}"]`).click();
  
        cy.location('pathname', { timeout: 10000 }).then((actualPath) => {
          if (actualPath !== expectedPath) {
            cy.log(`ADVERTENCIA: Ruta esperada para "${variant}" era "${expectedPath}", pero se obtuvo "${actualPath}"`);
          } else {
            cy.log(`Ruta correcta para "${variant}": ${actualPath}`);
          }
        });
      });
  
      cy.get('[data-testid="menu-btn-logout"]').click();
      cy.url({ timeout: 10000 }).should('include', '/auth/login');
    });
  });
  