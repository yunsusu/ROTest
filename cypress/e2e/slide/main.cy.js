describe("메인페이지 슬라이드 출력과 페이지 이동 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("슬라이드 출력 확인", () => {
    cy.get("#mainPromotion > ul > li").should("have.length.greaterThan", 0);
  });
  it("슬라이드 보이는 항목 클릭 후 이동 확인", () => {
    cy.get("#mainPromotion > ul > li:visible a").each((item) => {
      const href = item[0].href;

      cy.wrap(item).click();
      cy.url().should("eq", href);
    });
  });

  it("다음 화살표 클릭 시 다른 슬라이드가 보인다", () => {
    let beforeHref;

    cy.get("#mainPromotion > ul > li:visible a")
      .invoke("attr", "href")
      .then((href) => {
        beforeHref = href;
      });

    cy.get("#mainPromotion > nav > .btn_next").should("be.visible").click();

    cy.get("#mainPromotion > ul > li:visible a")
      .invoke("attr", "href")
      .should((afterHref) => {
        expect(afterHref).to.not.eq(beforeHref);
      });
  });
});
