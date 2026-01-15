function gnbMove(itName, sub, url) {
  it(itName, () => {
    // Given : 사용자가 메인페이지에 접속한다.
    cy.visit("/");

    // When : 사용자가 새소식 메뉴를 확인하고 하위 메뉴인 공지사항을 눌러 이동한다.
    cy.get(".news").should("be.visible").as("gnbNews");
    cy.get("." + sub).as("subMenu");

    cy.get("@gnbNews").trigger("mouseover");

    cy.get("@subMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    cy.location("pathname").should("eq", "/news/" + url + "/list.asp");
  });
}

describe("GNB 뉴스 이동 테스트", () => {
  gnbMove("새소식", "newsSub1", "notice");
  gnbMove("업데이트", "newsSub2", "update");
  gnbMove("개발자노트", "newsSub3", "devnote");
  gnbMove("이벤트", "newsSub4", "event");
  gnbMove("설문조사", "newsSub5", "survey");

  it("확률공개", () => {
    // Given : 사용자가 메인페이지에 접속한다.
    cy.visit("/");

    // When : 사용자가 새소식 메뉴를 확인하고 하위 메뉴인 확률공개를 확인한다.
    cy.get(".news").trigger("mouseover");

    // Then : 새 창으로 올바른 URL이 열리도록 구성되어 있는지 확인한다.
    cy.get(".newsSub6 a").invoke("removeAttr", "target").click();

    cy.url().should("include", "probability.gnjoy.com");
  });
});
