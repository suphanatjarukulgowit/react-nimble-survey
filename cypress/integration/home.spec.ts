describe('home page', () => {
  it('displays the correct text', () => {
    cy.visit('/');

    cy.findByTestId('homeMessage').contains('Edit <code>src/App.tsx</code> and save to reload');
  });
});
