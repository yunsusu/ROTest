describe("GNB 자료실 이동 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".dataRoom").should("be.visible").as("gnbDataRoom");

    cy.get("@gnbDataRoom").trigger("mouseover");
  });
  gnbMove("게임다운로드", "dataRoomSub1", "/pds/down/");
  gnbMove("이미지", "dataRoomSub2", "/pds/wallpaper/");
  gnbMove("멀티미디어", "dataRoomSub3", "/pds/multimedia/");
});

describe("사이드 메뉴를 이용한 메뉴 이동", () => {
  beforeEach(() => {
    cy.visit("/pds/multimedia/");
  });
  sideMove("게임다운로드", "lnbPds1", "/pds/down/");
  sideMove("이미지", "lnbPds2", "/pds/wallpaper/");
  sideMove("멀티미디어", "lnbPds3", "/pds/multimedia/");
});

function gnbMove(itName, sub, url) {
  it(itName, () => {
    // Given : 사용자가 메인페이지에 접속한다.
    // before로 이동
    // cy.visit("/");

    // When : 사용자가 게임정보 메뉴를 확인하고 하위 메뉴를 눌러 이동한다.
    cy.get(`.${sub}`).as("subMenu");

    cy.get("@subMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    cy.location("pathname").should("eq", url);
  });
}

function sideMove(itName, side, url) {
  it(itName, () => {
    // Given : 사용자가 게임정보 하위 페이지중 임의의 페이지에 접속한다.
    // cy.visit("/community/free/list.asp");

    // When : 사용자가 좌측에 있는 사이드 메뉴를 확인하고 눌러 각 페이지로 이동한다.

    cy.get(`.${side}`).as("subMenu");

    cy.get("@subMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    cy.location("pathname").should("eq", `${url}`);
  });
}
