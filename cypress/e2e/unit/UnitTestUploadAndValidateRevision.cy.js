describe('Verifiy CSV', () => {
    before(() => {
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

    it('Login and Verify Revision', () => {
        cy.visit('/auth/login');

        cy.get('[data-testid="input-txtinput-email"]').type('Plaga@gmail.com');
        cy.get('[data-testid="input-txtinput-password"]').type('plaga666');
        cy.get('[data-testid="btn-login"]').click();

        cy.get('[data-testid="login-loading"]').should('contain', 'Ingresando...');
        cy.url({ timeout: 10000 }).should('include', '/home');

        cy.get(`[data-testid="menu-btn-revisions"]`).should('exist');
        cy.get(`[data-testid="menu-btn-revisions"]`).click();

        cy.get(`[data-testid="addButton"]`).click();
        cy.get('[data-testid="input-revision-name"]').type('revision-unit-test');

        cy.get('[data-testid="file-upload"]').selectFile('cypress/files/invalid-csv.csv', {force: true})
        cy.contains('Faltan los siguientes encabezados: Longitud');

        cy.get('[data-testid="file-upload"]').selectFile('cypress/files/valid-csv.csv', {force: true})
        cy.contains('Archivo CSV válido');
    });
});