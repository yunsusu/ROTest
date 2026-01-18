describe("GNB 게임정보 이동 테스트", () => {
  gnbMove("라그나로크 소개", "infoSub1", "introduction");
  gnbMove("라그 시작하기", "infoSub2", "ragstart");
  gnbMove("시스템 소개", "infoSub4", "systeminfo");
  gnbMove("룬미드가츠 도서관", "infoSub5", "runemidgarts");
});

describe("사이드 메뉴를 이용한 메뉴 이동", () => {
  sideMove("라그나로크 소개", "lnbGuide1", "introduction");
  sideMove("라그 시작하기", "lnbGuide2", "ragstart");
  sideMove("시스템 소개", "lnbGuide3", "systeminfo");
  sideMove("룬미드가츠 도서관", "lnbGuide4", "runemidgarts/jobmain.asp");
});

function gnbMove(itName, sub, url) {
  it(itName, () => {
    // Given : 사용자가 메인페이지에 접속한다.
    cy.visit("/");

    // When : 사용자가 게임정보 메뉴를 확인하고 하위 메뉴를 눌러 이동한다.
    cy.get(".info").should("be.visible").as("gnbInfo");
    cy.get(`.${sub}`).as("subMenu");

    cy.get("@gnbInfo").trigger("mouseover");

    cy.get("@subMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    cy.location("pathname").should("eq", "/guide/" + url + "/");
  });
}

function sideMove(itName, side, url) {
  it(itName, () => {
    // Given : 사용자가 게임정보 하위 페이지중 임의의 페이지에 접속한다.
    cy.visit("/guide/introduction/");

    // When : 사용자가 좌측에 있는 사이드 메뉴를 확인하고 눌러 각 페이지로 이동한다.
    cy.get("." + side)
      .should("be.visible")
      .as("gnbInfo");
    cy.get(side === "lnbGuide1" ? `.${side}` : `.${side}_1`).as("subMenu");

    cy.get("@gnbInfo").click();
    cy.get("@subMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    cy.location("pathname").should(
      "eq",
      side === "lnbGuide4" ? `/guide/${url}` : `/guide/${url}/`
    );
  });
}
