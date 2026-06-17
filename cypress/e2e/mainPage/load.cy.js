describe("페이지 정상 접속 테스트", () => {
  // Given - 사용자가 메인 페이지에 접속했을 때
  cy.visit("/");
  // When - 페이지가 처음 로드되면
  cy.document().its("readyState").should("eq", "complete");
  // Then - 주요 콘텐츠가 정상적으로 표시되어야 한다
  cy.get(".gameStart").should("be.visible");
  cy.get(".login-btn").should("be.visible");
});
