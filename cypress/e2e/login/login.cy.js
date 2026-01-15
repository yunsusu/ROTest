describe("로그인창으로 이동 후 로그인 시도", () => {
  it("로그인창으로 이동", () => {
    cy.visit("/");

    cy.get(".login-btn").should("be.visible").as("loginBtn");

    // cy.get("@loginBtn").click();

    // cy.url().should(
    //   "eq",
    //   "https://login.gnjoy.com/?rtnurl=https%3A%2F%2Fro.gnjoy.com"
    // );
    // 클라우드 플레어로 인해서 로그인 제외
  });
});
