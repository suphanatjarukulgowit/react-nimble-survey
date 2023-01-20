describe('home page', () => {
  it('displays the correct text', () => {
    cy.visit('/');

    cy.findByTestId('home-message').contains('Edit <code>src/App.tsx</code> and save to reload');
  });
});
