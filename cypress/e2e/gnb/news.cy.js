describe("GNB 뉴스 이동 테스트", () => {
  // 웹에 있는 li 를 가져와 나중에 추가 되더라도 대응 가능하도록 수정
  it("하위 메뉴 이동 테스트", () => {
    cy.visit("/");
    cy.get(".news > ul > li").then((item) => {
      for (let i = 0; i < item.length - 1; i++) {
        const li = Cypress.$(item[i]);

        const itemClass = li.attr("class");
        const name = li.find("a").prop("href");
        const text = li.find("a").text();
        gnbMove(text, itemClass, name);
      }
    });
  });

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

function gnbMove(itName, sub, url) {
  // it(itName, () => {
  // Given : 사용자가 메인페이지에 접속한다.
  // cy.visit("/");

  // When : 사용자가 새소식 메뉴를 확인하고 하위 메뉴인 공지사항을 눌러 이동한다.
  cy.get(".news").should("be.visible").as("gnbNews");
  cy.get("." + sub).as("subMenu");

  cy.get("@gnbNews").trigger("mouseover");

  cy.get("@subMenu").should("be.visible").click();

  // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
  cy.url().should("eq", url);
  // });
}

describe("사이드 메뉴를 이용한 메뉴 이동", () => {
  it("사이드 메뉴 하위 버튼을 눌러 페이지 이동 확인", () => {
    cy.visit("/news/notice/List.asp");
    cy.get(".lnbNews > li").then((items) => {
      for (let i = 0; i < items.length; i++) {
        const item = Cypress.$(items[i]);

        const itemClass = item.attr("class");
        const name = item.find("a").prop("href");
        const text = item.find("a").text();

        sideMove(text, itemClass, name);
      }
    });
  });
});
function sideMove(itName, side, url) {
  // it(itName, () => {
  // Given : 사용자가 새소식 하위 페이지중 임의의 페이지에 접속한다.
  // cy.visit("/news/notice/List.asp");

  // When : 사용자가 좌측에 있는 사이드 메뉴를 확인하고 눌러 각 페이지로 이동한다.
  cy.get("." + side).as("sideMenu");

  cy.get("@sideMenu").should("be.visible").click();

  // Then : 메뉴를 이용해 이동한 페이지가 올바른 URL인지 확인한다.
  cy.url().should("eq", url + "List.asp");
  // });
}
