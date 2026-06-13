describe("공지사항 리스트 출력과 클릭 시 이동 테스트", () => {
  beforeEach(() => {
    // Given - 공지사항 리스트 페이지에서
    cy.visit("/news/notice/list.asp");
  });
  // When - 페이지가 로드되었을 때
  it("공지사항 리스트 출력 확인", () => {
    // Then - 화면에 리스트들이 정상적으로 출력되어야 함
    cy.get(".notice tbody tr").then((item) => {
      for (let i = 0; i < item.length; i++) {
        cy.wrap(item[i]).should("be.visible");
      }
    });
  });

  // When - 공지사항 리스트 항목을 클릭해 이동하였을 때
  it("공지사항 리스트 클릭 후 이동 확인", () => {
    // Then - 해당 공지사항 상세 페이지로 이동해야 한다
    cy.get(".notice tbody tr")
      .its("length")
      .then((len) => {
        for (let i = 0; i < len; i++) {
          cy.get(".notice tbody tr")
            .eq(i)
            .find("a")
            .then(($a) => {
              const href = $a.prop("href");

              cy.wrap($a).click();
              cy.url().should("eq", href);
              cy.go("back");
            });
        }
      });
  });
});
