describe("메인페이지 내 검색 기능 동작", () => {
  it("검색 정상 로드 확인", () => {
    // Given - 메인 페이지에서
    cy.visit("/");
    // When - 페이지가 로드되었을 때
    cy.document().its("readyState").should("eq", "complete");
    // Then - 정상적으로 검색영역이 떠야함
    cy.get("#librarySearchMain").should("be.visible");
  });

  it("검색 후 이동 확인", () => {
    // Given - 메인 페이지에서
    cy.visit("/");
    // When - 검색 영역에 타이핑 후 이동했을 때
    cy.get("#librarySearchMain").should("be.visible");
    cy.get("#librarySearchMain").type("포링").type("{enter}");
    // Then - 해당 페이지로 이동 후 url이 정상적으로 보여야 함
    // 이동 후 뒤에 쿼리가 정상적으로 붙어야 함
    // 검색 결과 갯수 출력 확인
    cy.url()
      .should("include", "/guide/runemidgarts/result.asp")
      .and("include", "runSearch=");
  });
});
