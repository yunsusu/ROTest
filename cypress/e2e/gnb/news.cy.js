describe("GNB 뉴스 이동 테스트", () => {
  gnbMove("공지사항", "newsSub1", "notice");
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

describe("사이드 메뉴를 이용한 메뉴 이동", () => {
  sideMove("공지사항", "lnbNews1", "notice");
  sideMove("업데이트", "lnbNews2", "update");
  sideMove("개발자노트", "lnbNews3", "devnote");
  sideMove("이벤트", "lnbNews4", "event");
  sideMove("설문조사", "lnbNews5", "survey");
});

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

function sideMove(itName, side, url) {
  it(itName, () => {
    // Given : 사용자가 새소식 하위 페이지중 임의의 페이지에 접속한다.
    cy.visit("/news/notice/List.asp");

    // When : 사용자가 좌측에 있는 사이드 메뉴를 확인하고 눌러 각 페이지로 이동한다.
    cy.get("." + side).as("sideMenu");

    cy.get("@sideMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    // 왜 사이드메뉴만 list.asp에서 L이 대문자인지는 모르겠음..
    cy.location("pathname").should("eq", "/news/" + url + "/List.asp");
  });
}
