export function noLoginMove(startWhere, name, where) {
  it(name, () => {
    // Given : 사용자가 비로그인 상태로 접속
    // cy.visit(startWhere);

    // confirm을 자동으로 true 반환하게 설정
    cy.on("window:confirm", (text) => {
      expect(text).to.include("로그인이 필요한 서비스");
      return true;
    });

    // When : 로그인이 필요한 버튼을 누름 (비로그인 상태)
    cy.get("." + where + " > a").click(); // CommonLogin 호출 트리거

    // Then : 팝업 확인을 누를 시 로그인 페이지로 이동
    // cloudflare 때문에 실패라고 표시됨
    cy.url().should(
      "include",
      "https://login.gnjoy.com/?rtnurl=https%3A%2F%2Fro.gnjoy.com%2Fpds%2Fdown%2F"
    );
  });
}
