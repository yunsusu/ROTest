import { noLoginMove } from "../../support/noLogin.js";

describe("GNB 고객센터 이동 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".support").should("be.visible").as("gnbSupport");

    cy.get("@gnbSupport").trigger("mouseover");
  });
  gnbMove("FAQ", "supportSub1", "faq/faqlist.asp");
  gnbMove("1:1문의", "supportSub2", "inquiry/inquirywrite.asp");
  gnbMove("이용안내", "supportSub4", "useinfo/");
  gnbMove("정기점검", "supportSub5", "inspection/");

  noLoginMove("/", "문의내역", "supportSub3");
});

describe("사이드 메뉴를 이용한 메뉴 이동", () => {
  beforeEach(() => {
    cy.visit("/support/faq/faqlist.asp");
  });
  sideMove("FAQ", "lnbSupport1", "faq/faqlist.asp");
  sideMove("1:1문의", "lnbSupport2", "inquiry/inquirywrite.asp");
  sideMove("이용안내", "lnbSupport4", "useinfo/");
  sideMove("정기점검", "lnbSupport5", "inspection/");

  noLoginMove("/", "문의내역", "lnbSupport3");
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
    cy.location("pathname").should("eq", "/support/" + url);
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
    cy.location("pathname").should("eq", `/support/${url}`);
  });
}
