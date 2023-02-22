const loginScreenTestIds = {
  loginHeader: 'login-header',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
};
describe('Login page', () => {
  it('renders the login page with the right element', () => {
    cy.visit('/');
    cy.get('.app-header-title').should('have.text', 'Sign in to Nimble');
    cy.findByTestId(loginScreenTestIds.loginEmail).should('exist');
    cy.findByTestId(loginScreenTestIds.loginPassWord).should('exist');
  });

  describe('given valid credentials', () => {
    it('redirects to survey homepage', () => {
      cy.visit('/');
      cy.findByTestId(loginScreenTestIds.loginEmail).type('suphanat@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('12345678');
      cy.findByTestId(loginScreenTestIds.loginSubmit).click();
      cy.location('pathname').should('equal', '/home');
    });
  });
});
