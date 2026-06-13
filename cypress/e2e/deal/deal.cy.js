describe("라그나로크 아이템 거래현황", () => {
  it("거래현황 페이지 접속", () => {
    // Given - 거래현황 페이지에서
    cy.visit("/itemDeal/dealSearch.asp");
    // When - 페이지가 로드되었을 때
    cy.document().its("readyState").should("eq", "complete");
    // Then - 정상적으로 검색 input이 떠야함
    cy.get("#itemFullName").should("be.visible");
  });

  it("아이템 키워드 입력 후 검색 가능 확인", () => {
    // 검색 시 무조건 출력될법한 아이템들로 구성
    const keyWord = ["대장장이", "월드 이동", "이그드라실"];

    keyWord.forEach((item) => {
      // Given - 거래현황 페이지에서
      cy.visit("/itemDeal/dealSearch.asp");
      // When - 검색 인풋을 통해 키워드를 입력해서 검색하면
      cy.get("#itemFullName").as("Search");

      cy.get("@Search").should("be.visible").clear().type(item).type("{enter}");

      // Then - 해당 키워드 관련 리스트 출력

      cy.get(".listTypeOfDefault tbody tr .item").should("be.visible");
    });
  });

  it("인기 아이템 Best5 4개 리스트 출력 확인", () => {
    const bestBox = ["#bestViewW", "#bestViewD", "#bestViewC", "#bestViewE"];

    // Given - 거래현황 페이지에서
    cy.visit("/itemDeal/dealSearch.asp");

    // When - 페이지가 로드되었을 때
    cy.document().its("readyState").should("eq", "complete");

    // Then - 정상적으로 리스트들이 출력되어야 함
    bestBox.forEach((item) => {
      cy.get(`${item} li a`).invoke("text").should("not.be.empty");
    });
  });

  it("검색 후 라디오 버튼을 이용해 필터링", () => {
    const radioBox = [
      "#itemAll",
      "#itemWeapon",
      "#itemArmor",
      "#itemExpendables",
      "#itemEtc",
    ];

    // Given - 거래현황 페이지에서
    cy.visit("/itemDeal/dealSearch.asp");

    // When - 특정 키워드를 검색 후
    cy.get("#itemFullName").as("Search");

    cy.get("@Search").should("be.visible").clear().type("아").type("{enter}");

    // Then - 해당 필터링이 적용되어야 한다.
    cy.get("#searchResult strong, #searchResult span")
      .invoke("text")
      .then((count) => {
        if (count.trim() == "없음") {
          cy.log("검색 결과 없음");
          return;
        }

        for (const radio of radioBox) {
          cy.get(radio).check({ force: true });

          cy.get("#searchResult")
            .should("be.visible")
            .invoke("text")
            .should("not.be.empty");

          cy.get(".listTypeOfDefault tbody tr").should(
            "have.length.greaterThan",
            0
          );
        }
      });
  });
});
