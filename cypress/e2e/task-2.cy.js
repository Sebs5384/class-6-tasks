const URL = "http://192.168.18.65:8080/task-2/task-2-index.html";

describe("Testing task-2-calculator", () => {
  it("Test the correct use of task-2-calculator", () => {
    cy.visit(URL);

    for (let i = 0; i < 4; i++) {
      cy.get('button[name="button-add-member"]').click();
    }

    cy.get('button[name="calculate-button"]').should("be.visible");
    cy.get("#member-1").should("exist");
    cy.get("#member-2").should("exist");
    cy.get("#member-3").should("exist");
    cy.get("#member-4").should("exist");

    cy.get("#member-1").type("1");
    cy.get("#member-2").type("2");
    cy.get("#member-3").type("3");
    cy.get("#member-4").type("4");

    cy.get('button[name="calculate-button"]').click();
    cy.get("#salary-results").should("be.visible");
    cy.get("#highest-salary").should("have.text", "4");
    cy.get("#lowest-salary").should("have.text", "1");
    cy.get("#average-salary").should("have.text", "2.5");
    cy.get("#monthly-salary").should("have.text", "0.2");

    cy.get('button[name="button-remove-member"]').click();
    cy.get("member-4").should("not.exist");
    cy.get('button[name="button-remove-member"]').click();
    cy.get("member-3").should("not.exist");
    cy.get('button[name="button-remove-member"]').click();
    cy.get("member-2").should("not.exist");
    cy.get('button[name="button-remove-member"]').click();
    cy.get("member-1").should("not.exist");

    cy.get("#button-calculate").should("not.be.visible");
    cy.get("#salary-results").should("not.be.visible");
  });
});
