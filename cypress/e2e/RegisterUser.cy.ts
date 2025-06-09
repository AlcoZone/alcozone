describe('Registro de usuario', () => {
  it('Debería registrar un usuario nuevo correctamente', () => {
    cy.visit('/users');

    cy.get('#user').type('usuarioTest');
    cy.get('#email').type('usuarioTest@example.com');
    cy.get('#password').type('12345678');
    cy.get('#role').type('Administrador');

    cy.get('[data-testid="register-button"]').click();

    cy.on('window:alert', (msg) => {
      expect(msg).to.include('Usuario registrado exitosamente');
    });

    cy.contains('usuarioTest');
  });
});

describe('Registro de usuario - error en email', () => {
  it('Debe mostrar error si el correo no es válido', () => {
    cy.visit('/users');

    cy.get('#user').type('usuarioTest');
    cy.get('#email').type('emailInvalido');
    cy.get('#password').type('12345678');
    cy.get('#role').type('Administrador');

    cy.get('[data-testid="register-button"]').click();

    cy.contains('Correo electrónico inválido.').should('be.visible');
  });
});
