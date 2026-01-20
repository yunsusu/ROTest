describe("GNB RO_SHOP 이동 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".shop").should("be.visible").as("gnbShop");

    cy.get("@gnbShop").trigger("mouseover");
  });
  gnbMove("아이템몰", "shopSub1", "/roshop/mall.asp");
  gnbMove("캐시아이템 이용안내", "shopSub2", "/roshop/cashitemuseinfo.asp");
  gnbMove("요금결제", "shopSub3", "/roshop/chargepayment.asp");
});

describe("사이드 메뉴를 이용한 메뉴 이동", () => {
  beforeEach(() => {
    cy.visit("/roshop/mall.asp");
  });
  sideMove("아이템몰", "lnbRoShop1", "/roshop/mall.asp");
  sideMove("캐시아이템 이용안내", "lnbRoShop2", "/roshop/cashitemuseinfo.asp");
  sideMove("요금결제", "lnbRoShop3", "/roshop/chargepayment.asp");
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

    // When : 사용자가 좌측에 있는 사이드 메뉴를 확인하고 눌러 각 페이지로 이동한다.
    cy.get(`.${side}`).as("subMenu");

    cy.get("@subMenu").should("be.visible").click();

    // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
    cy.location("pathname").should("eq", url);
  });
}
