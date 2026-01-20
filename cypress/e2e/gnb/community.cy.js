import { noLoginMove } from "../../support/noLogin.js";

describe("GNB 커뮤니티 이동 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".community").should("be.visible").as("gnbCommunity");

    cy.get("@gnbCommunity").trigger("mouseover");
  });
  gnbMove("자유게시판", "communitySub1", "free/list.asp");
  gnbMove("공성게시판", "communitySub2", "siege/list.asp");
  gnbMove("스크린샷", "communitySub3", "screen/list.asp");
  gnbMove("팬아트", "communitySub4", "fanart/list.asp");
  gnbMove("공유게시판", "communitySub5", "share/list.asp");
  gnbMove("이벤트게시판", "communitySub6", "memory/list.asp");

  noLoginMove("/", "캐릭터 검색", "communitySub7");
});

describe("사이드 메뉴를 이용한 메뉴 이동", () => {
  beforeEach(() => {
    cy.visit("/community/free/list.asp");
  });
  sideMove("자유게시판", "lnbCommunity1", "free/List.asp");
  sideMove("공성게시판", "lnbCommunity2", "siege/List.asp");
  sideMove("스크린샷", "lnbCommunity3", "screen/List.asp");
  sideMove("팬아트", "lnbCommunity4", "fanart/List.asp");
  sideMove("공유게시판", "lnbCommunity5", "share/List.asp");
  sideMove("이벤트게시판", "lnbCommunity6", "memory/List.asp");

  noLoginMove("/", "캐릭터 검색", "lnbCommunity7");
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
    cy.location("pathname").should("eq", "/community/" + url);
  });
}

function sideMove(itName, side, url) {
  it(itName, () => {
    // Given : 사용자가 게임정보 하위 페이지중 임의의 페이지에 접속한다.
    // cy.visit("/community/free/list.asp");

    // When : 사용자가 좌측에 있는 사이드 메뉴를 확인하고 눌러 각 페이지로 이동한다.
    cy.get("." + side)
      .should("be.visible")
      .as("gnbInfo");
    cy.get(`.${side}`).as("subMenu");

    cy.get("@gnbInfo").click();
    cy.get("@subMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    cy.location("pathname").should("eq", `/community/${url}`);
  });
}
