describe("로그인을 하지 않은 상태로 다운로드 시도", () => {
  downFunc("상단 게임 다운로드", "gamedownload");
  downFunc("압축 클라이언트", "compressionClient");
  downFunc("AI 기본 스크립트", "aiScript");
  //   downFunc("상단 게임 다운로드", "directX");
  it("directX", () => {
    // Given : 사용자가 다운로드 페이지에 접속한다.
    cy.visit("/pds/down/");

    // When : DirectX 다운로드 링크를 확인한다.
    cy.get(".directX > a")
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "http://www.microsoft.com/ko-kr/download/details.aspx?id=35"
      );
  });
});

function downFunc(name, where) {
  it(name, () => {
    // Given : 사용자가 다운로드 페이지에 접속
    cy.visit("/pds/down/");

    // confirm을 자동으로 true 반환하게 설정
    cy.on("window:confirm", (text) => {
      expect(text).to.include("로그인이 필요한 서비스");
      return true;
    });

    // When : 다운로드 버튼을 누름 (비로그인 상태)
    cy.get("." + where + " > a").click(); // CommonLogin 호출 트리거

    // Then : 팝업 확인을 누를 시 로그인 페이지로 이동
    // cloudflare 때문에 실패라고 표시됨
    cy.url().should(
      "include",
      "https://login.gnjoy.com/?rtnurl=https%3A%2F%2Fro.gnjoy.com%2Fpds%2Fdown%2F"
    );
  });
}
