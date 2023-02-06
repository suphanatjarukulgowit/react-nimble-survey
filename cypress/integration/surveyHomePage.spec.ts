const userProfileDatatestIds = {
  userName: 'userName',
  userLine: 'userLine',
  userAvatar: 'userAvatar',
  logOutButton: 'loggoutButton',
  appVersion: 'appVersion',
  userProfileContainer: 'userProfileContainer'
};
const defaultLayoutDataTestIds = {
  layoutDefault: 'layoutDefault',
  appLogo: 'appLogo',
};

describe('Survey Home Page', () => {
  it('render the survey home page with the right element', () => {
    cy.login();
    cy.findByTestId(defaultLayoutDataTestIds.layoutDefault).should('exist');
    cy.findByTestId(defaultLayoutDataTestIds.appLogo).should('exist');

  });
  it('render the user profile after click user avatar', () => {
    cy.login();
    cy.get('[data-test-id="userAvatar"] > .user-button > .user-avatar').click();
    cy.findByTestId(userProfileDatatestIds.userLine).should('exist');
    cy.findByTestId(userProfileDatatestIds.logOutButton).should('exist');
    cy.findByTestId(userProfileDatatestIds.appVersion).should('exist');
  });
  it('hide suer profile after click user avatar', () => {
    cy.login();
    cy.get('[data-test-id="userAvatar"] > .user-button > .user-avatar').click();
    cy.findByTestId(userProfileDatatestIds.userProfileContainer).should('have.class', 'user-menu__collapse user-menu__collapse--open')
  });
});
  