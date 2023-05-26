const URL = "http://192.168.18.65:8080/task-1/task-1-index.html";

describe("Testing task-1", () => {
  it("Test the correct use of task-1-calculator", () => {
    cy.visit(URL);

    cy.get('input[name="members-quantity"]').type("4");
    cy.get('button[name="quantity-submit"]').click();

    cy.get("#member-1").type("1");
    cy.get("#member-2").type("2");
    cy.get("#member-3").type("3");
    cy.get("#member-4").type("4");

    cy.get("button[name='calculate-button']").click();
    cy.get("#paragraph-1").should("have.text", "The youngest member on your family is 1 years old");
    cy.get("#paragraph-2").should("have.text", "While the oldest is 4 years old");
    cy.get("#paragraph-3").should("have.text", "And the average age in your family is 2.5.");
  });
});
