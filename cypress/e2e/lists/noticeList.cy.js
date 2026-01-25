describe("공지사항 리스트 출력과 클릭 시 이동 테스트", () => {
  beforeEach(() => {
    cy.visit("/news/notice/list.asp");
  });
  it("공지사항 리스트 출력 확인", () => {
    cy.get(".notice tbody tr").then((item) => {
      for (let i = 0; i < item.length; i++) {
        cy.wrap(item[i]).should("be.visible");
      }
    });
  });

  it("공지사항 리스트 클릭 후 이동 확인", () => {
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
