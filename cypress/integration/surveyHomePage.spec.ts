const userProfileDatatestIds = {
  userName: 'userName',
  userLine: 'userLine',
  userAvatar: 'userAvatar',
  logOutButton: 'loggoutButton',
  appVersion: 'appVersion',
  userProfileContainer: 'userProfileContainer',
};
const defaultLayoutDataTestIds = {
  layoutDefault: 'layoutDefault',
  appLogo: 'appLogo',
};

const todayDateTestIds = {
  date: 'today-date__date',
  title: 'today-date__title',
};

const surveyListDataTestIds = {
  surveyListContainer: 'surveyListContainer',
};

describe('Survey Home Page', () => {
  it('renders the survey home page with the right element', () => {
    cy.login();
    cy.findByTestId(defaultLayoutDataTestIds.layoutDefault).should('exist');
    cy.findByTestId(defaultLayoutDataTestIds.appLogo).should('exist');
  });

  it('renders the user profile after click user avatar', () => {
    cy.login();
    cy.get(':nth-child(1) > .user-button > .user-avatar').click();
    cy.findByTestId(userProfileDatatestIds.userLine).should('exist');
    cy.findByTestId(userProfileDatatestIds.logOutButton).should('exist');
    cy.findByTestId(userProfileDatatestIds.appVersion).should('exist');
  });

  it('hide user profile after click user avatar', () => {
    cy.login();
    cy.get(':nth-child(1) > .user-button > .user-avatar').click();
    cy.findByTestId(userProfileDatatestIds.userProfileContainer).should(
      'have.class',
      'user-menu-collapse user-menu-collapse--open'
    );
  });

  it('renders date of current date', () => {
    cy.login();
    cy.findByTestId(todayDateTestIds.date).should('exist');
    cy.findByTestId(todayDateTestIds.title).should('exist');
  });

  it('renders survey list', () => {
    cy.login();
    cy.findByTestId(surveyListDataTestIds.surveyListContainer).should('exist');
    cy.get('.swiper-slide-active > .cursor-pointer > .survey-cover-image').should('exist');
    cy.get('.swiper-slide-active > .cursor-pointer > :nth-child(2) > .survey-title').should('exist');
    cy.get('.swiper-slide-active > .cursor-pointer > :nth-child(2) > .survey-button > a > img').should('exist');
    cy.get('.swiper-pagination').should('exist');
  });
});
