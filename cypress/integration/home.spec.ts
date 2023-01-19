describe('home page', () => {
  it('the p tag contains the correct text', () => {
    cy.visit('http://localhost:3000');
    cy.get('p').should('exist').contains('Edit·<code>src/App.tsx</code>·and·save·to·reload');
  });
});
