import '@testing-library/cypress/add-commands';

const loginScreenTestIds = {
  loginHeader: 'login-header',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
};

Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.findByTestId(loginScreenTestIds.loginEmail).type('suphanat@nimblehq.co');
  cy.findByTestId(loginScreenTestIds.loginPassWord).type('123456789');
  cy.findByTestId(loginScreenTestIds.loginSubmit).click();
  cy.location('pathname').should('equal', '/home');
});
