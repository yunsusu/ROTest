// it("로그인을 하지 않고 다운로드 클릭 시 로그인 페이지로 이동한다", () => {
//   // Given : 사용자가 다운로드 페이지에 접속
//   cy.visit("/pds/down/");

//   // confirm을 자동으로 true 반환하게 설정
//   cy.on("window:confirm", (text) => {
//     expect(text).to.include("로그인이 필요한 서비스");
//     return true;
//   });

//   // When : 다운로드 버튼을 누름 (비로그인 상태)
//   cy.get(".gamedownload > a").click(); // CommonLogin 호출 트리거

//   // Then : 팝업 확인을 누를 시 로그인 페이지로 이동
//   cy.get('img[alt="라그나로크 온라인 게임 다운로드"]')
//     .parent("a")
//     .invoke("attr", "href")
//     .should("include", "RO_DOWNLOADPOPUP")
//     .and("include", "701")
//     .and("include", "580");
// });

// 로그인상태를 주는 방법을 찾아야 할듯..
