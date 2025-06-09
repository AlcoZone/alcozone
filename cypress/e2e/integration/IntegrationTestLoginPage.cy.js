describe('Login Page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('/auth/login');
  });

  it('renderiza los campos y el botón correctamente', () => {
    cy.get('[data-testid="input-txtinput-email"]').should('exist');
    cy.get('[data-testid="input-txtinput-password"]').should('exist');
    cy.get('[data-testid="btn-login"]').should('exist');
  });

  it('muestra error si los campos están vacíos', () => {
    cy.get('[data-testid="btn-login"]').click();
    cy.get('[data-testid="login-error"]').should('contain', 'Por favor, completa ambos campos.');
  });

  it('muestra error si Firebase responde con credenciales inválidas', () => {
    cy.intercept('POST', '**/accounts:signInWithPassword**', {
      statusCode: 400,
      body: {
        error: {
          code: 400,
          message: 'INVALID_LOGIN_CREDENTIALS',
        },
      },
    }).as('firebaseLogin');

    cy.get('[data-testid="input-txtinput-email"]').type('test@user.com');
    cy.get('[data-testid="input-txtinput-password"]').type('wrongpassword');
    cy.get('[data-testid="btn-login"]').click();

    cy.wait('@firebaseLogin');
    cy.get('[data-testid="login-error"]').should('contain', 'correo o la contraseña son incorrectos');
  });

  it('muestra el mensaje de carga al hacer login', () => {
    cy.intercept('POST', '**/accounts:signInWithPassword**', (req) => {
      req.reply((res) => {
        res.delay = 1000;
        res.send({
          idToken: 'mock-token',
          localId: 'user123',
        });
      });
    }).as('firebaseLogin');

    cy.get('[data-testid="input-txtinput-email"]').type('Plaga@gmail.com');
    cy.get('[data-testid="input-txtinput-password"]').type('plaga666');
    cy.get('[data-testid="btn-login"]').click();

    cy.get('[data-testid="login-loading"]').should('contain', 'Ingresando...');
  });

  it('realiza login válido y permite logout, luego accede a links de ayuda', () => {
    // Login real
    cy.get('[data-testid="input-txtinput-email"]').type('Plaga@gmail.com');
    cy.get('[data-testid="input-txtinput-password"]').type('plaga666');
    cy.get('[data-testid="btn-login"]').click();

    cy.url({ timeout: 10000 }).should('include', '/home');

    // Logout
    cy.get('[data-testid="menu-btn-logout"]').click();
    cy.url().should('include', '/auth/login');

    // Link "¿Olvidaste tu contraseña?"
    cy.get('[data-testid="forgot-password-link"]').should('be.visible').click();
    cy.url().should('include', '/auth/forgotPassword');

    // Volver al login
    cy.visit('/auth/login');

    // Link "Aviso de privacidad"
    cy.get('[data-testid="privacy-link"]').should('be.visible').click();
    cy.url().should('include', '/privacy');
  });
});
